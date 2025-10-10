These are the header fields included in the `order-expenses.csv` file:


| DEFAULT SEQUENCE | .CSV COLUMN HEADER NAME | ✓ | TYPE | OTHER REQUIREMENTS / COMMENTS | DESCRIPTION |
| --- | --- | --- | --- | --- | --- |
| 1 | order_reference | Yes | String |  | Order reference identifier. |
| 2 | order_shipment_id | No | Number |  |Order shipment identification. |
| 3 | canceled_amount | No | Number | Default = 0 | Expense canceled amount. |
| 4 | discount_amount_aggregation | No | Number | Default = 0 | Expense discount amount aggregation. |
| 5 | gross_price | Yes | Number | The original value is multiplied by 100, before stored in this field | Gross price of the expense. |
| 6 | name | No | String |  | Name of the expense. |
| 7 | net_price | No | Number | The original value is multiplied by 100, before stored in this field. | Net price of the expense. |
| 8 | price | No | Number | The original value is multiplied by 100, before stored in this field. | Price of the expense. |
| 9 |price_to_pay_aggregation  | No | Number |The original value is multiplied by 100, before stored in this field.  |Expense price to pay aggregation.  |
| 10 | refundable_amount | No | Number | The original value is multiplied by 100, before stored in this field. |Refundable amount of the expense. |
| 11 | 	tax_amount | No | Number |The original value is multiplied by 100, before stored in this field.  | Tax amount of the expense. |
| 12 | 	tax_amount_after_cancellation | No | Number | The original value is multiplied by 100, before stored in this field. | Expense tax amount after cancellation. |
| 13 | tax_rate	 | No | Number |  | Tax rate of the expense. |
| 14 | 	type | No | String |  | Type of expense. |
| 15 | expense_created_at | Yes | Date Time |  |Timestamp of this sales expense creation.  |
| 16 |expense_updated_at | Yes | Date Time |  | Last update timestamp of this sales expense. |

 Check out the [order-expenses.csv sample file](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Development+Guide/Data+Export/order-expenses.csv).