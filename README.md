# adf.vin

The Auto Lead Data Format (ADF) is a standard for describing the information needed by a car dealer to provide a customer with a quote for a vehicle and related products or services. The ADF standard was developed by a consortium of companies in the automotive retail space, and this ultra-lightweight library provides a simple way to generate ADF XML documents.

## Example

```javascript
fetch(
	'https://adf.vin/api?' +
		`created=${new Date().toISOString()}&` +
		'firstName=John&' +
		'lastName=Doe&' +
		'email=john.doe%40example.com&' +
		'phone=%2B15555555555&' +
		'year=2018&' +
		'make=Ford&' +
		'model=F-150&' +
		'trim=XL'
)
	.then((response) => response.text())
	.then((xml) => console.log(xml));
```

## [🚀 We're hiring!](https://careers.do/apply)

[Driv.ly](https://driv.ly) is simple APIs to buy & sell cars online, funded by some of the [biggest names](https://twitter.com/TurnerNovak) in [automotive](https://fontinalis.com/team/#bill-ford) and [finance & insurance](https://www.detroit.vc)

We're building our entire infrastructure on Cloudflare Workers, Durable Objects, KV, R2, and PubSub. If you're as passionate about these transformational technologies as we are, we'd love for you to join our rapidly-growing team.
