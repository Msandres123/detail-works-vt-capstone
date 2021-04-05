import React from "react";
import { useState } from "react";

export default function SuvPrice(props) {
  const [suvIntDetCount, setSuvIntDetCount] = useState(0);
  const [suvExtDetCount, setSuvExtDetCount] = useState(0);
  const [suvIntExtCount, setSuvIntExtCount] = useState(0);
  const [suvShampooCount, setSuvShampooCount] = useState(0);
  const [suvPetCount, setSuvPetCount] = useState(0);
  const [suvHeadlinerCount, setSuvHeadlinerCount] = useState(0);
  const [suvStainCount, setSuvStainCount] = useState(0);
  const [suvDeodorizeCount, setSuvDeodorizeCount] = useState(0);
  const [suvHeadlightCount, setSuvHeadlightCount] = useState(0);
  const [suvClaybarCount, setSuvClaybarCount] = useState(0);
  const [suvDeluxeCount, setSuvDeluxeCount] = useState(0);

  function suvInteriorDetailing() {
    if (suvIntDetCount === 0) {
      props.setPrice(props.price + 150);
      setSuvIntDetCount(1);
    }
    if (suvIntDetCount > 0) {
      props.setPrice(props.price - 150);
      setSuvIntDetCount(0);
    }
  }

  function suvExtDet() {
    if (suvExtDetCount === 0) {
      props.setPrice(props.price + 130);
      setSuvExtDetCount(1);
    }
    if (suvExtDetCount > 0) {
      props.setPrice(props.price - 130);
      setSuvExtDetCount(0);
    }
  }

  function intExtCombo() {
    if (suvIntExtCount === 0) {
      props.setPrice(props.price + 245);
      setSuvIntExtCount(1);
    }
    if (suvIntExtCount > 0) {
      props.setPrice(props.price - 245);
      setSuvIntExtCount(0);
    }
  }

  function suvShampoo() {
    if (suvShampooCount === 0) {
      props.setPrice(props.price + 70);
      setSuvShampooCount(1);
    }
    if (suvShampooCount > 0) {
      props.setPrice(props.price - 70);
      setSuvShampooCount(0);
    }
  }

  function suvPet() {
    if (suvPetCount === 0) {
      props.setPrice(props.price + 70);
      setSuvPetCount(1);
    }
    if (suvPetCount > 0) {
      props.setPrice(props.price - 70);
      setSuvPetCount(0);
    }
  }

  function suvHeadliner() {
    if (suvHeadlinerCount === 0) {
      props.setPrice(props.price + 30);
      setSuvHeadlinerCount(1);
    }
    if (suvHeadlinerCount > 0) {
      props.setPrice(props.price - 30);
      setSuvHeadlinerCount(0);
    }
  }

  function suvStain() {
    if (suvStainCount === 0) {
      props.setPrice(props.price + 150);
      setSuvStainCount(1);
    }
    if (suvStainCount > 0) {
      props.setPrice(props.price - 150);
      setSuvStainCount(0);
    }
  }

  function suvDeodorize() {
    if (suvDeodorizeCount === 0) {
      props.setPrice(props.price + 30);
      setSuvDeodorizeCount(1);
    }
    if (suvDeodorizeCount > 0) {
      props.setPrice(props.price - 30);
      setSuvDeodorizeCount(0);
    }
  }

  function suvHeadlight() {
    if (suvHeadlightCount === 0) {
      props.setPrice(props.price + 40);
      setSuvHeadlightCount(1);
    }
    if (suvHeadlightCount > 0) {
      props.setPrice(props.price - 40);
      setSuvHeadlightCount(0);
    }
  }

  function suvClaybar() {
    if (suvClaybarCount === 0) {
      props.setPrice(props.price + 150);
      setSuvClaybarCount(1);
    }
    if (suvClaybarCount > 0) {
      props.setPrice(props.price - 150);
      setSuvClaybarCount(0);
    }
  }

  function suvDeluxe() {
    if (suvDeluxeCount === 0) {
      props.setPrice(props.price + 500);
      setSuvDeluxeCount(1);
    }
    if (suvDeluxeCount > 0) {
      props.setPrice(props.price - 500);
      setSuvDeluxeCount(0);
    }
  }

  return (
    <div id="services-container">
      <h5>SUV/Truck/Minivan Base Services</h5>

      <label>
        <input
          type="checkbox"
          name="service"
          value="Interior Detailing"
          onChange={suvInteriorDetailing}
        />
        Interior Detailing: $150
      </label>

      <label>
        <input
          type="checkbox"
          name="service"
          value="Exterior Detailing"
          onChange={suvExtDet}
        />
        Exterior Detailing: $130
      </label>

      <label>
        <input
          type="checkbox"
          name="service"
          value="Interior/Exterior Combo Detailing"
          onChange={intExtCombo}
        />
        Interior/Exterior Combo Detailing: $245
      </label>

      <h5>Interior Add-On Services for SUV/Truck/Minivan:</h5>

      <label>
        <input
          type="checkbox"
          name="service"
          value="Machine Shampoo"
          onChange={suvShampoo}
        />
        Machine Shampoo: $70
      </label>

      <label>
        <input
          type="checkbox"
          name="service"
          value="Pet Hair Removal"
          onChange={suvPet}
        />
        Pet Hair Removal: $70
      </label>

      <label>
        <input
          type="checkbox"
          name="service"
          value="Headliner Cleaned"
          onChange={suvHeadliner}
        />
        Headliner Cleaned: $30
      </label>

      <label>
        <input
          type="checkbox"
          name="service"
          value="Major Stain Removal"
          onChange={suvStain}
        />
        Major Stain Removal: $150
      </label>

      <label>
        <input type="checkbox" name="service" value="Deodorize" onChange={suvDeodorize} />
        Deodorize: $30
      </label>

      <label>
        <input type="checkbox" name="service" value="None Requested" />
        None Requested
      </label>

      <h5>Exterior Add-Ons for SUV/Truck/Minivan:</h5>

      <label>
        <input
          type="checkbox"
          name="service"
          value="Headlight Restoration"
          onChange={suvHeadlight}
        />
        Headlight Restoration: $40
      </label>

      <label>
        <input
          type="checkbox"
          name="service"
          value="Claybar Service"
          onChange={suvClaybar}
        />
        Claybar Service: $150
      </label>

      <label>
        <input
          type="checkbox"
          name="service"
          value="Deluxe Exterior"
          onChange={suvDeluxe}
        />
        Deluxe Exterior (Claybar/Buff/Sealant) $500
      </label>

      <label>
        <input type="checkbox" name="service" value="None Requested" />
        None Requested
      </label>
    </div>
  );
}
