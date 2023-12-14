import { useEffect } from "react";
import { getCabins } from "./apiCabin";
import { useState } from "react";
import CabinRow from "./CabinRow";
import "./styles.css";
import Menus from "./Menus";

export default function CabinTable() {
  const [isLoading, setIsLoading] = useState(false);
  const [cabins, setCabins] = useState([]);
  const [error, setError] = useState({});

  useEffect(function () {
    async function fetchCabins() {
      try {
        setIsLoading(true);
        const data = await getCabins();
        setCabins(data);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCabins();
  }, []);

  if (isLoading) return <h2>Loading</h2>;
  if (!isLoading && Object.keys(error).length > 0)
    return <h2>{error.status}</h2>;
  if (!isLoading && Object.keys(error).length === 0 && cabins.length === 0)
    return <h2>No data found</h2>;

  return (
    <Menus>
      <div>
        <button>Add Cabin</button>
      </div>
      <div className="container">
        <header className="header">
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </header>

        <div>
          {cabins.map((cabin) => (
            <CabinRow key={cabin.cabinName} cabin={cabin} />
          ))}
        </div>
      </div>
    </Menus>
  );
}
