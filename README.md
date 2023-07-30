# ADF.vin

The [Auto Lead Data Format (ADF)](https://en.wikipedia.org/wiki/Auto-lead_Data_Format) is a standard for describing the information needed by a car dealer to provide a customer with a quote for a vehicle and related products or services. The ADF standard was developed by a consortium of companies in the automotive retail space, and this ultra-lightweight library provides a simple way to generate ADF XML documents.

The API currently supports the following fields:

| Field            | Description                                                                    |
| ---------------- | ------------------------------------------------------------------------------ |
| id               | The internal ID of the lead                                                    |
| idSource         | The source of the lead ID                                                      |
| interest         | The type of interest the customer has (buy, sell, trade-in, lease, test drive) |
| firstName        | The customer's first name                                                      |
| lastName         | The customer's last name                                                       |
| phone            | The customer's phone number                                                    |
| email            | The customer's email address                                                   |
| timeframe        | The customer's timeframe for purchase                                          |
| customerComments | Any comments the customer has                                                  |
| newUsedStatus    | The status of the vehicle (new, used)                                          |
| yearLower        | The lower bound of the vehicle's year                                          |
| yearUpper        | The upper bound of the vehicle's year                                          |
| year             | The vehicle's year                                                             |
| bodyStyle        | The vehicle's body style                                                       |
| make             | The vehicle's make                                                             |
| model            | The vehicle's model                                                            |
| trim             | The vehicle's trim level                                                       |
| transmission     | The vehicle's transmission type (usually A for automatic or M for manual)      |
| vehicleComments  | Any comments about the vehicle                                                 |
| vendor           | The name of the vendor                                                         |
| created          | The date the lead was created in ISO 8601 format                               |

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
		'trim=XL',
)
	.then((response) => response.text())
	.then((xml) => console.log(xml));
```

## [🚀 We're hiring!](https://careers.do/apply)

[Driv.ly](https://driv.ly) is simple APIs to buy & sell cars online, funded by some of the [biggest names](https://twitter.com/TurnerNovak) in [automotive](https://fontinalis.com/team/#bill-ford) and [finance & insurance](https://www.detroit.vc)

We're building our entire infrastructure on Cloudflare Workers, Durable Objects, KV, R2, and PubSub. If you're as passionate about these transformational technologies as we are, we'd love for you to join our rapidly-growing team.
