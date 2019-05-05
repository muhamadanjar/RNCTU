export default taxiTypes = [
    {
      type: "TaxiCar",
      title: "4 wheelers",
      icon: "car",
      pricePerKm: 0.1, // $0.1 per km
      standardDurationPerKm: 12 // 0.5 minute per km
    },
    {
      type: "TaxiShare",
      title: "7 wheelers",
      icon: "car-estate",
      pricePerKm: 0.07,
      standardDurationPerKm: 14
    },
    {
      type: "Premium",
      title: "BMW, Mec, etc",
      icon: "car-sports",
      pricePerKm: 0.2,
      standardDurationPerKm: 12
    },
    {
      type: "TaxiBike",
      title: "2 wheelers",
      icon: "motorbike",
      pricePerKm: 0.04,
      standardDurationPerKm: 12
    }
  ]