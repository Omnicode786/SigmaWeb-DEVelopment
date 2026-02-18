import React from "react";
import "../assets/Car.css";

const Car = (car) => {
  return (
    <div className="car-card " style={{margin:" 20px"}}>
      <div className="car-header">
        <h2>{car.make} {car.model}</h2>
      </div>

      <div className="car-body">
        <p><strong>ID:</strong> {car.id}</p>
        <p><strong>Price:</strong> ${car.price}</p>
      </div>
    </div>
  );
};

export default Car;
