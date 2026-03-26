# MongoDB array updates (addresses)

## Example document (before)

```json
{
  "_id": 1,
  "name": "Deepak",
  "addresses": [
    { "_id": 11, "city": "Delhi", "isDefault": false },
    { "_id": 12, "city": "Kolkata", "isDefault": true },
    { "_id": 13, "city": "Mumbai", "isDefault": false }
  ]
}
```

## Update all elements (clear defaults)

To set `isDefault: false` on every address:

```js
await User.updateOne(
  { _id: userId },
  {
    $set: {
      "addresses.$[].isDefault": false
    }
  }
);
```

After this update, every address will have `isDefault: false`.

## Set one address as default

To set one specific address as default:

```js
await User.updateOne(
  { _id: userId, "addresses._id": addressId },
  {
    $set: {
      "addresses.$.isDefault": true
    }
  }
);
```

`"addresses._id": addressId` matches the array element; `$` refers to the first matched element.

## Clear all defaults and set one default (atomic)

```js
await User.updateOne(
  { _id: userId },
  {
    $set: {
      "addresses.$[].isDefault": false,
      "addresses.$[elem].isDefault": true
    }
  },
  {
    arrayFilters: [{ "elem._id": addressId }]
  }
);
```

`$[]` updates all elements; `$[elem]` updates the filtered element(s) defined in `arrayFilters`.

## Quick reference

| Operator | Meaning |
| -------- | ------- |
| `$` | matched element |
| `$[]` | all elements |
| `$[<identifier>]` | filtered elements (requires `arrayFilters`) |
| `$set` | set/update a field |
| `$push` | append to an array |
| `$pull` | remove from an array |
