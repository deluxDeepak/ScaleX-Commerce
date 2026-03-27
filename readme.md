{
  "devDependencies": {
    "husky": "^9.1.7"
  },
  "scripts": {
    "prepare": "husky",

    "test": "npm run test:backend && npm run test:frontend && npm run test:e2e",

    Prefix-directly run on backend 
    cd backen && npm run    --Problem cross platform nahi hai 
    "test:backend": "npm --prefix Backend test",
    "test:frontend": "npm --prefix Front-end test",

    "test:e2e": "npx playwright test"
  }
}

"test:integration": "jest integration"  only scan integration folder 
