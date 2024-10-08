import { StatusCodes } from 'http-status-codes'
import axios from 'axios'

const baseUrl = "https://realty-in-us.p.rapidapi.com/properties/v3"
const listingsUrl = "/list"
const listingDetailsUrl = "/detail?property_id="
const photosUrl = "/get-photos?property_id="

const getListingsZipCode = async (req, res) => {
  const { zipCode } = req.body
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
      'x-rapidapi-host': process.env['X_RAPIDAPI_HOST'],
      'x-rapidapi-key': process.env['X_RAPIDAPI_KEY']
    }
  })
  const { home_search: data } = response.data.data
  // total number of results, array of results
  const { total, results } = data
  const homes1 = results.filter(result => result.location.address.street_name !== null)

  const homes = homes1.map(result => {
    return {
      propertyId: result.property_id,
      address: `${result.location.address.street_number} ${result.location.address.street_name} ${result.location.address.street_suffix}`,
      city: result.location.address.city,
      state: result.location.address.state,
      zipCode: result.location.address.postal_code,
      streetViewImage: result.location.street_view_url,
      primaryImage: result.primary_photo?.href,
      bedrooms: result.description.beds,
      bathrooms: result.description.baths,
      listPrice: result.list_price,
      estimate: result.estimate?.estimate,
    }
  })
  res.status(StatusCodes.OK).json({ total, homes })
}

const getListingDetails = async (req, res) => {
  const { id } = req.params
  const url = `${baseUrl}${listingDetailsUrl}${id}`
  const response = await axios.get(url, {
    headers: {
      'Content-Type': 'application/json',
      'x-rapidapi-host': process.env['X_RAPIDAPI_HOST'],
      'x-rapidapi-key': process.env['X_RAPIDAPI_KEY']
    }
  })
  const { home: result } = response.data.data
  const home = {
    propertyId: result.property_id,
    description: result.description.text,
    yearBuilt: result.description.year_built,
    photos: result.photos.map(photo => photo.href),
    listDate: result.list_date,
    lastSoldPrice: result.last_sold_price,
    lastSoldDate: result.last_sold_date,
    link: result.href,
  }
  res.status(StatusCodes.OK).json({ home })
}

export { getListingsZipCode, getListingDetails }