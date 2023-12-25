# fly-lo

A simple interface for querying selected airline offers.

## usage

enter airport origin + destination codes, along with date range to query, and select 'Search'

## background

i've begun by grabbing the openapi docs for the first two airlines i'll work with. i converted each to yaml using the [Swagger editor](https://editor.swagger.io/), then i used the [Typed-Openapi client](https://github.com/astahmer/typed-openapi) to simply generate zod schemas from the docs.

i have yet to find a tool that will specifically convert a spec to schemas. maybe that's a project for another day. given that the scope of this app is pretty narrow, i really only need schemas for select routes. an automated solution seems overly complex for the time being.
- after some experimentation, i've run into the classic problem with openapi: does anyone actually maintain those docs? afklm does not appear to. in any case, there's a tradeoff between confidence in the schema itself and the ability to programmatically couple with third-party resources. in a higher-stakes context, i might try to get the service to update their docs, or get a more thorough rundown of their resources
- i am instead parsing against a custom schema derived from services' observed behavior

i've also set up corresponding queries in a [Bruno](https://www.usebruno.com/) collection. its been a great tool for testing the apis, but i'm still working out how to incorporate it into a project. it can read from opeanapi, so maybe there's an opportunity for an interesting script down the road.

this quickly got more complicated than i intended. i was hoping to use the native svelte api for managing forms, but i don't know the api well enough to handle date pickers, which brought [Superforms](https://superforms.rocks/) and [Formsnap](https://www.formsnap.dev/) into the mix.
- part of the complexity arose from going too hard too fast + doubling down on [Shadcn-UI](https://www.shadcn-svelte.com/). it's an awesome project, though in my naivete i have mixed feelings about the form setup, but perhaps a too-advanced approach to ui in a framework (Svelte) i've only begun too learn. that calendar range picker is nice though
  - why can't i use `GET` actions with Formsnap?
  - what's with the hyperfixation on root props?

passing the form between client + server triggered some invalidation that had me stuck for a while, until i found the `$page` store. that was clutch. the overall actions pattern is great though; very straightforward
