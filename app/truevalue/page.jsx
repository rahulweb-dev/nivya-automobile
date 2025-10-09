"use client";
import { useState, useMemo } from "react";
import { truevalueCars } from "@/data/truevalueCars";
import TrueValueFilter from "../components/truevalue-components/TrueValueFilter";
import TrueValueGrid from "../components/truevalue-components/TrueValueGrid";


export default function TrueValuePage() {
  const [filters, setFilters] = useState({
    budget: 1200000,
    kmDriven: 150000,
    fuelType: "",
    modelYears: [],
    brand: "",
    color: "",
    transmission: "",
  });

  const filteredCars = useMemo(() => {
    return truevalueCars.filter((car) => {
      if (car.price > filters.budget) return false;
      if (car.kmDriven > filters.kmDriven) return false;
      if (filters.fuelType && car.fuelType !== filters.fuelType) return false;
      if (filters.modelYears.length && !filters.modelYears.includes(car.modelYear)) return false;
      if (filters.brand && car.brand !== filters.brand) return false;
      if (filters.color && car.color !== filters.color) return false;
      if (filters.transmission && car.transmission !== filters.transmission) return false;
      return true;
    });
  }, [filters]);

  return (
    <div className="container flex flex-col gap-6 p-4 mx-auto mt-24 md:flex-row">
      <TrueValueFilter filters={filters} setFilters={setFilters} />
      <div className="flex-1">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">{filteredCars.length} Listings Found</h2>
          <input
            type="text"
            placeholder="Search by name"
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, search: e.target.value.toLowerCase() }))
            }
            className="px-3 py-2 border rounded-md"
          />
        </div>
        <TrueValueGrid
          cars={filteredCars.filter((car) =>
            filters.search ? car.name.toLowerCase().includes(filters.search) : true
          )}
        />
      </div>
    </div>
  );
}
