# use the official Bun image
# see all versions at https://hub.docker.com/r/oven/bun/tags
FROM oven/bun:1.0-slim as base
WORKDIR /usr/src/app

RUN apt-get update -y && apt-get install -y

# install dependencies into temp directory
# this will cache them and speed up future builds
FROM base as install
RUN mkdir -p /temp/dev
COPY package.json bun.lockb /temp/dev/
RUN cd /temp/dev && bun install --frozen-lockfile

# install with --production (exclude devDependencies)
RUN mkdir -p /temp/prod
COPY package.json bun.lockb /temp/prod/
RUN cd /temp/prod && bun install --frozen-lockfile --production

# copy node_modules from temp directory
# then copy all (non-ignored) project files into the image
FROM base as prerelease
COPY --from=install /temp/dev/node_modules node_modules
COPY . .

# [optional] tests & build
ENV NODE_ENV=production
# RUN bun test
RUN bun run build

# copy production dependencies and source code into final image
FROM base as release
COPY --from=install /temp/prod/node_modules node_modules
COPY --from=prerelease /usr/src/app/build ./build
COPY --from=prerelease /usr/src/app/package.json .

# run the app
USER bun
EXPOSE 3000/tcp
ENTRYPOINT ["bun", "start"]

# build image
# docker build --pull -t fly-lo .

# run container
# docker run -d -p 3000:3000 fly-lo
