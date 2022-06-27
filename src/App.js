import React, { useState, useEffect } from 'react'
const url = 'https://api.github.com/users/QuincyLarson'

const App = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const [user, setUser] = useState('default user')

  useEffect(() => {
    fetch(url)
      .then((resp) => {
        if (resp.status >= 200 && resp.status <= 299) {
          return resp.json()
        } else {
          setIsLoading(false)
          setIsError(true)
          throw new Error(resp.statusText)
        }
      })
      .then((user) => {
        console.log(user)

        const userLogin = user.login
        setUser(userLogin)
        setIsLoading(false) // set is loading to false once we have the data we need
      })
      .catch((error) => console.log(error))
  }, [])

  if (isLoading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    )
  }

  if (isError) {
    return (
      <div>
        <h1>Error...</h1>
      </div>
    )
  }

  // Default response is that we are getting the user
  return (
    <div>
      <h1>{user}</h1>
    </div>
  )
}

export default App
