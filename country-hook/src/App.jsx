import axios from "axios";
import React, { useEffect, useState } from "react";

const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

const useCountry = (name) => {
  const [country, setCountry] = useState(null);

  useEffect(() => {
    const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/name";

    const getCountry = async (name) => {
      try {
        const response = await axios.get(`${baseUrl}/${name}`);
        const data = response.data;

        setCountry({
          data: {
            name: data.name.common,
            capital: data.capital[0],
            population: data.population,
            flag: data.flags.png,
          },
          found: true,
        });
      } catch (error) {
        console.log(error.response.data.error);
        setCountry({ found: false });
      }
    };

    if (name !== "") {
      getCountry(name);
    }
  }, [name]);

  return country;
};

const Country = ({ country }) => {
  if (!country) {
    return null;
  }

  if (!country.found) {
    return <div>not found...</div>;
  }

  return (
    <div>
      <h3>{country.data.name} </h3>
      <div>capital {country.data.capital} </div>
      <div>population {country.data.population}</div>
      <img
        src={country.data.flag}
        height="100"
        alt={`flag of ${country.data.name}`}
      />
    </div>
  );
};

const App = () => {
  const nameInput = useField("text");
  const [name, setName] = useState("");
  const country = useCountry(name);

  const fetch = (e) => {
    e.preventDefault();
    setName(nameInput.value);
  };

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  );
};

export default App;
