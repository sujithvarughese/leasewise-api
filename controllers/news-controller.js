import axios from 'axios'

const fetchNewsArticles = async (req, res) => {

  try {
    const response = await axios("https://newsapi.org/v2/everything?q=real-estate", {
      headers: {
        "X-Api-Key": process.env['X_API_KEY']
      }
    })
    let { articles } = response.data
    const filteredArticles = articles.filter(article => article["urlToImage"] !== null)


    res.status(200).json({ filteredArticles })

  } catch (error) {
    throw new Error(error)
  }

}

export { fetchNewsArticles }