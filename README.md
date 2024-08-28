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
