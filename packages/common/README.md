# (NEW) Central Management Library

[![npm version](https://badge.fury.io/js/%40pantherx.dev%2Fcommon.svg)](https://badge.fury.io/js/%40pantherx.dev%2Fcommon)

This library contains shared classes, interfaces and other non-platform specific functions. Even though the library is public, we do not provide support, or assurance for this to work now, or continue to work in the future.

So: **This likely won't be useful to you unless you are working with us, or with / on one of our products.**

## Usage

Install with

```bash
npm i --save @pantherx.dev/common
```

and use like this:

```js
import {
  UserMaster,
  USER_ROLES_MASTER
  IdentityServerUserLog
} from "@pantherx.dev/common"
```

### Important

This library is constantly changing. Ensure that you fix this dependency to an exact version, or narrow version range:

```js
"dependencies": {
  "@pantherx.dev/common": "0.0.1",
}
```