# fly-lo

A simple interface for querying selected airline offers.


https://github.com/astahmer/typed-openapi
https://typed-openapi-astahmer.vercel.app/


i've begun by grabbing the openapi docs for the first two airlines i'll work with. i converted each to yaml using the [Swagger Editor](https://editor.swagger.io/), then i used the [typed-openapi client](https://github.com/astahmer/typed-openapi) to simply generate zod schemas from the docs.

i have yet to find a tool that will specifically convert a spec to schemas. maybe that's a project for another day. given that the scope of this app is pretty narrow, i really only need schemas for select routes. an automated solution seems overly complex for the time being.

i've also set up corresponding queries in a [bruno](https://www.usebruno.com/) collection. its been a great tool for testing the apis, but i'm still working out how to incorporate it into a project. it can read from opeanapi, so maybe there's an opportunity for an interesting script down the road.
