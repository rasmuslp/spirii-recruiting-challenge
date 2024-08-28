# Spirii Recruiting Challenge

## Run the project

Install the dependencies

```bash
$ npm ci
```

Optionally, run format, lint, and build to see that they don't produce any errors

```bash
$ npm run full-suite
```

Start the development server (good enough for this)

```bash
$ npm run start:dev
```

## Endpoints

The service exposes two endpoints.

### Aggregated data on a user level

Available at

```
http://localhost:3000/user/:id
```

Here `earned`, `spent`, `payout`, and `paidOut` are just sums of amounts from those transactions. While `balance` is what is available on the account. I assumed that an unprocessed `payout` is still available for usage and thus did not deduct it from the `balance`.

Dummy data is available for `id` `1` and `2`

```
http://localhost:3000/user/1
http://localhost:3000/user/2
```

### Unprocessed payout amounts for all users

Available at

```
http://localhost:3000/accounting/requested-payouts
```

I assumed that this is the unprocessed payouts, and thus it returns the difference between `payout` and `paidOut` for all users where the difference is not `0`. That is why the example only returns data for `userId` `1`.

## Testing

The optimal testing strategy does not require 100 percent test coverage. 100 percent coverage is not pragmatic, and often overkill, as not _all_ code needs to be tested.

I would apply unit tests to complicated (business) logic. So I can run it fast in isolation, and have high confidence in the (business) rules being implemented correctly.

End to end tests and integration tests I would add to validate high level data flows and consistency. And perhaps also some simple ones to function as smoke tests.

Tests takes time to write, and time to maintain, so they have to be meaningful. I rely as much as possible on static analysis to ensure that the application is sound.

### Automatic testing with TDD

Run tests on each commit. The rest is in the name of 'test driven development'.

For this to be applicable, you have to have a good idea of what it is you are building. But from there, it's pretty easy to apply: Write a failing test, fix the failing test by implementing the logic. Rinse, repeat.

## Thoughts on the architecture

Here I have assumed a fast local DB - to be able to get and process the raw transactions for each request.

This is flexible, in the sense that we only need to do a code update to get new types of data in the aggregates, and a bug doesn't affect any stored data (stored here, at least).

However, given a large enough dataset, even a local DB will reach a point where it's going to consume a lot of resources to reprocess all events since the dawn of time.

Caching of intermediate calculations could probably solve this, but assuming our load comes from a large enough subset of the total users, we should probably instead just calculate and store the aggregates, as the data from the transactions API is streamed in. Then this service would only need to do lookups, and could effectively return responses to clients in constant time.

The downside of that of course being, that we risk having to recalculate the aggregates when changing the content, and handle this in a transparent way for the clients (so they don't experience a period of data unavailability).
