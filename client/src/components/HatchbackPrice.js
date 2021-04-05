import React from "react";
import { useState } from "react";

export default function HatchbackPrice(props) {
  const [hatchbackIntDetCount, setHatchbackIntDetCount] = useState(0);
  const [hatchbackExtDetCount, setHatchbackExtDetCount] = useState(0);
  const [hatchbackIntExtCount, setHatchbackIntExtCount] = useState(0);
  const [hatchbackShampooCount, setHatchbackShampooCount] = useState(0);
  const [hatchbackPetCount, setHatchbackPetCount] = useState(0);
  const [hatchbackHeadlinerCount, setHatchbackHeadlinerCount] = useState(0);
  const [hatchbackStainCount, setHatchbackStainCount] = useState(0);
  const [hatchbackDeodorizeCount, setHatchbackDeodorizeCount] = useState(0);
  const [hatchbackHeadlightCount, setHatchbackHeadlightCount] = useState(0);
  const [hatchbackClaybarCount, setHatchbackClaybarCount] = useState(0);
  const [hatchbackDeluxeCount, setHatchbackDeluxeCount] = useState(0);

  function hatchbackInteriorDetailing() {
    if (hatchbackIntDetCount === 0) {
      props.setPrice(props.price + 135);
      setHatchbackIntDetCount(1);
    }
    if (hatchbackIntDetCount > 0) {
      props.setPrice(props.price - 135);
      setHatchbackIntDetCount(0);
    }
  }

  function hatchbackExtDet() {
    if (hatchbackExtDetCount === 0) {
      props.setPrice(props.price + 120);
      setHatchbackExtDetCount(1);
    }
    if (hatchbackExtDetCount > 0) {
      props.setPrice(props.price - 120);
      setHatchbackExtDetCount(0);
    }
  }

  function IntExtCombo() {
    if (hatchbackIntExtCount === 0) {
      props.setPrice(props.price + 220);
      setHatchbackIntExtCount(1);
    }
    if (hatchbackIntExtCount > 0) {
      props.setPrice(props.price - 220);
      setHatchbackIntExtCount(0);
    }
  }

  function hatchbackShampoo() {
    if (hatchbackShampooCount === 0) {
      props.setPrice(props.price + 60);
      setHatchbackShampooCount(1);
    }
    if (hatchbackShampooCount > 0) {
      props.setPrice(props.price - 60);
      setHatchbackShampooCount(0);
    }
  }

  function hatchbackPet() {
    if (hatchbackPetCount === 0) {
      props.setPrice(props.price + 60);
      setHatchbackPetCount(1);
    }
    if (hatchbackPetCount > 0) {
      props.setPrice(props.price - 60);
      setHatchbackPetCount(0);
    }
  }

  function hatchbackHeadliner() {
    if (hatchbackHeadlinerCount === 0) {
      props.setPrice(props.price + 30);
      setHatchbackHeadlinerCount(1);
    }
    if (hatchbackHeadlinerCount > 0) {
      props.setPrice(props.price - 30);
      setHatchbackHeadlinerCount(0);
    }
  }

  function hatchbackStain() {
    if (hatchbackStainCount === 0) {
      props.setPrice(props.price + 125);
      setHatchbackStainCount(1);
    }
    if (hatchbackStainCount > 0) {
      props.setPrice(props.price - 125);
      setHatchbackStainCount(0);
    }
  }

  function hatchbackDeodorize() {
    if (hatchbackDeodorizeCount === 0) {
      props.setPrice(props.price + 30);
      setHatchbackDeodorizeCount(1);
    }
    if (hatchbackDeodorizeCount > 0) {
      props.setPrice(props.price - 30);
      setHatchbackDeodorizeCount(0);
    }
  }

  function hatchbackHeadlight() {
    if (hatchbackHeadlightCount === 0) {
      props.setPrice(props.price + 40);
      setHatchbackHeadlightCount(1);
    }
    if (hatchbackHeadlightCount > 0) {
      props.setPrice(props.price - 40);
      setHatchbackHeadlightCount(0);
    }
  }

  function hatchbackClaybar() {
    if (hatchbackClaybarCount === 0) {
      props.setPrice(props.price + 125);
      setHatchbackClaybarCount(1);
    }
    if (hatchbackClaybarCount > 0) {
      props.setPrice(props.price - 125);
      setHatchbackClaybarCount(0);
    }
  }

  function hatchbackDeluxe() {
    if (hatchbackDeluxeCount === 0) {
      props.setPrice(props.price + 450);
      setHatchbackDeluxeCount(1);
    }
    if (hatchbackDeluxeCount > 0) {
      props.setPrice(props.price - 450);
      setHatchbackDeluxeCount(0);
    }
  }

  return (
    <div id="services-container">
      {" "}
      <h5>Hatchback/Crossover Base Services</h5>
      <label>
        <input
          type="checkbox"
          name="service"
          value="Interior Detailing"
          onChange={hatchbackInteriorDetailing}
        />
        Interior Detailing: $135
      </label>
      <label>
        <input
          type="checkbox"
          name="service"
          value="Exterior Detailing"
          onChange={hatchbackExtDet}
        />
        Exterior Detailing: $120
      </label>
      <label>
        <input
          type="checkbox"
          name="services"
          value="Interior/Exterior Combo Detailing"
          onChange={IntExtCombo}
        />
        Interior/Exterior Combo Detailing: $220
      </label>
      <h5>Interior Add-On Services for Hatchback/Crossover:</h5>
      <label>
        <input
          type="checkbox"
          name="service"
          value="Machine Shampoo"
          onChange={hatchbackShampoo}
        />
        Machine Shampoo: $60
      </label>
      <label>
        <input
          type="checkbox"
          name="service"
          value="Pet Hair Removal"
          onChange={hatchbackPet}
        />
        Pet Hair Removal: $60
      </label>
      <label>
        <input
          type="checkbox"
          name="service"
          value="Headliner Cleaned"
          onChange={hatchbackHeadliner}
        />
        Headliner Cleaned: $30
      </label>
      <label>
        <input
          type="checkbox"
          name="service"
          value="Major Stain Removal"
          onChange={hatchbackStain}
        />
        Major Stain Removal: $125
      </label>
      <label>
        <input
          type="checkbox"
          name="service"
          value="Deodorize"
          onChange={hatchbackDeodorize}
        />
        Deodorize: $30
      </label>
      <label>
        <input type="checkbox" name="service" value="None Requested" />
        None Requested
      </label>
      <h5>Exterior Add-Ons for Hatchback/Crossover:</h5>
      <label>
        <input
          type="checkbox"
          name="service"
          value="Headlight Restoration"
          onChange={hatchbackHeadlight}
        />
        Headlight Restoration: $40
      </label>
      <label>
        <input
          type="checkbox"
          name="service"
          value="Claybar Service"
          onChange={hatchbackClaybar}
        />
        Claybar Service: $125
      </label>
      <label>
        <input
          type="checkbox"
          name="service"
          value="Deluxe Exterior"
          onChange={hatchbackDeluxe}
        />
        Deluxe Exterior (Claybar/Buff/Sealant) $450
      </label>
      <label>
        <input type="checkbox" name="service" value="None Requested" />
        None Requested
      </label>
    </div>
  );
}
