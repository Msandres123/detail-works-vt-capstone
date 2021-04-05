import React from "react";
import { useState } from "react";

export default function CoupePrice(props) {
  const [coupeIntDetCount, setCoupeIntDetCount] = useState(0);
  const [coupeExtDetCount, setCoupeExtDetCount] = useState(0);
  const [coupeIntExtCount, setCoupeIntExtCount] = useState(0);
  const [coupeShampooCount, setCoupeShampooCount] = useState(0);
  const [coupePetCount, setCoupePetCount] = useState(0);
  const [coupeHeadlinerCount, setCoupeHeadlinerCount] = useState(0);
  const [coupeStainCount, setCoupeStainCount] = useState(0);
  const [coupeDeodorizeCount, setCoupeDeodorizeCount] = useState(0);
  const [coupeHeadlightCount, setCoupeHeadlightCount] = useState(0);
  const [coupeClaybarCount, setCoupeClaybarCount] = useState(0);
  const [coupeDeluxeCount, setCoupeDeluxeCount] = useState(0);

  function coupeInteriorDetailing() {
    if (coupeIntDetCount === 0) {
      props.setPrice(props.price + 120);
      setCoupeIntDetCount(1);
    }
    if (coupeIntDetCount > 0) {
      props.setPrice(props.price - 120);
      setCoupeIntDetCount(0);
    }
  }

  function coupeExtDet() {
    if (coupeExtDetCount === 0) {
      props.setPrice(props.price + 100);
      setCoupeExtDetCount(1);
    }
    if (coupeExtDetCount > 0) {
      props.setPrice(props.price - 100);
      setCoupeExtDetCount(0);
    }
  }


  function coupeIntExtCombo() {
    if (coupeIntExtCount === 0) {
      props.setPrice(props.price + 185);
      setCoupeIntExtCount(1);
    }
    if (coupeIntExtCount > 0) {
      props.setPrice(props.price - 185);
      setCoupeIntExtCount(0);
    }
  }

  function coupeShampoo() {
    if (coupeShampooCount === 0) {
      props.setPrice(props.price + 50);
      setCoupeShampooCount(1);
    }
    if (coupeShampooCount > 0) {
      props.setPrice(props.price - 50);
      setCoupeShampooCount(0);
    }
  }

  function coupePet() {
    if (coupePetCount === 0) {
      props.setPrice(props.price + 50);
      setCoupePetCount(1);
    }
    if (coupePetCount > 0) {
      props.setPrice(props.price - 50);
      setCoupePetCount(0);
    }
  }

  function coupeHeadliner() {
    if (coupeHeadlinerCount === 0) {
      props.setPrice(props.price + 30);
      setCoupeHeadlinerCount(1);
    }
    if (coupeHeadlinerCount > 0) {
      props.setPrice(props.price - 30);
      setCoupeHeadlinerCount(0);
    }
  }


  function coupeStain() {
    if (coupeStainCount === 0) {
      props.setPrice(props.price + 100);
      setCoupeStainCount(1);
    }
    if (coupeStainCount > 0) {
      props.setPrice(props.price - 100);
      setCoupeStainCount(0);
    }
  }

  function coupeDeodorize() {
    if (coupeDeodorizeCount === 0) {
      props.setPrice(props.price + 30);
      setCoupeDeodorizeCount(1);
    }
    if (coupeDeodorizeCount > 0) {
      props.setPrice(props.price - 30);
      setCoupeDeodorizeCount(0);
    }
  }

  function coupeHeadlight() {
    if (coupeHeadlightCount === 0) {
      props.setPrice(props.price + 40);
      setCoupeHeadlightCount(1);
    }
    if (coupeHeadlightCount > 0) {
      props.setPrice(props.price - 40);
      setCoupeHeadlightCount(0);
    }
  }

  function coupeClaybar() {
    if (coupeClaybarCount === 0) {
      props.setPrice(props.price + 100);
      setCoupeClaybarCount(1);
    }
    if (coupeClaybarCount > 0) {
      props.setPrice(props.price - 100);
      setCoupeClaybarCount(0);
    }
  }

  function coupeDeluxe() {
    if (coupeDeluxeCount === 0) {
        props.setPrice(props.price + 400);
        setCoupeDeluxeCount(1);
      }
      if (coupeDeluxeCount > 0) {
        props.setPrice(props.price - 400);
        setCoupeDeluxeCount(0);
      }
  }

  return (
    <div id="services-container">
      {" "}
      <h5>Coupe/Sedan Base Services</h5>
      <label>
        <input
          type="checkbox"
          name="service"
          value="Interior Detailing"
          onChange={coupeInteriorDetailing}
        />
        Interior Detailing: $120
      </label>
      <label>
        <input
          type="checkbox"
          name="service"
          value="Exterior Detailing"
          onChange={coupeExtDet}
        />
        Exterior Detailing: $100
      </label>
      <label>
        <input
          type="checkbox"
          name="service"
          value="Interior/Exterior Combo Detailing"
          onChange={coupeIntExtCombo}
        />
        Interior/Exterior Combo Detailing: $185
      </label>
      <h5>Interior Add-On Services for Coupes/Sedans:</h5>
      <label>
        <input type="checkbox" name="service" onChange={coupeShampoo} />
        Machine Shampoo: $50
      </label>
      <label>
        <input
          type="checkbox"
          name="service"
          value="Pet Hair Removal"
          onChange={coupePet}
        />
        Pet Hair Removal: $50
      </label>
      <label>
        <input
          type="checkbox"
          name="service"
          value="Headliner Cleaned"
          onChange={coupeHeadliner}
        />
        Headliner Cleaned: $30
      </label>
      <label>
        <input
          type="checkbox"
          name="service"
          value="Major Stain Removal"
          onChange={coupeStain}
        />
        Major Stain Removal: $100
      </label>
      <label>
        <input type="checkbox" name="service" value="Deodorize" onChange={coupeDeodorize} />
        Deodorize: $30
      </label>
      <label>
        <input type="checkbox" name="service" value="None Requested" />
        None Requested
      </label>
      <h5>Exterior Add-Ons for Coupes/Sedans:</h5>
      <label>
        <input
          type="checkbox"
          name="service"
          value="Headlight Restoration"
          onChange={coupeHeadlight}
        />
        Headlight Restoration: $40
      </label>
      <label>
        <input
          type="checkbox"
          name="service"
          value="Claybar Service"
          onChange={coupeClaybar}
        />
        Claybar Service: $100
      </label>
      <label>
        <input
          type="checkbox"
          name="service"
          value="Deluxe Exterior"
          onChange={coupeDeluxe}
        />
        Deluxe Exterior (Claybar/Buff/Sealant) $400
      </label>
      <label>
        <input type="checkbox" name="service" value="None Requested" />
        None Requested
      </label>
    </div>
  );
}
