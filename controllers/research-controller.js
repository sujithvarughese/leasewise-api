import { StatusCodes } from 'http-status-codes'
import axios from 'axios'

const baseUrl = "https://realty-in-us.p.rapidapi.com/properties/v3"
const listingsUrl = "/list"
const getListingsZipCode = async (req, res) => {
  const { zipCode } = req.body
  console.log(zipCode)

  const requestConfig = {
    limit: 200,
    offset :0,
    postal_code: zipCode,
    status: ["for_sale","ready_to_build"],
    sort: {"direction": "desc", "field": "list_date"}
  }

  const response = await axios.post(`${baseUrl}${listingsUrl}`, JSON.stringify(requestConfig), {
    headers: {
      'Content-Type': 'application/json',
      'x-rapidapi-host': process.env['X-RAPIDAPI-HOST'],
      'x-rapidapi-key': process.env['X-RAPIDAPI-KEY']
    }
  })
  const { home_search: data } = response.data.data
  // total number of results, array of results
  const { total, results } = data
  const homes = results.map(result => {
    return {
      address: `${result.location.address.street_number} ${result.location.address.street_name} ${result.location.address.street_suffix}`,
      city: result.location.address.city,
      state: result.location.address.state,
      zipCode: result.location.address.postal_code,
      streetViewImage: result.location.street_view_url,
      primaryImage: result.primary_photo.href,
      bedrooms: result.description.beds,
      bathrooms: result.description.baths,
      listPrice: result.list_price,
      listDate: result.list_date,
      estimate: result.estimate?.estimate,
      lastSoldPrice: result.last_sold_price,
      lastSoldDate: result.last_sold_date,
      link: result.href
    }
  })

  res.status(StatusCodes.OK).json({ data: { total, homes } })
}


export { getListingsZipCode }