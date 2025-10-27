"use client";

import ResponsiveBanner from "@/app/components/ResponsiveBanner";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronUp, Filter, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { FaSpinner } from "react-icons/fa";

export default function TrueValuePage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/vehicles/");
      const result = await res.json();
      setData(result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const defaultFilters = {
    budget: 2000000,
    kmDriven: 200000,
    fuelType: "",
    modelYear: "",
    brand: "",
    color: "",
    transmission: "",
    sortOrder: "",
    bodyType: "",
    userType: "",
    search: "",
  };

  const [filters, setFilters] = useState(defaultFilters);
  const [showSidebar, setShowSidebar] = useState(false);

  const brands = [...new Set(data?.vehicles?.map((c) => c.brand))];
  const fuelTypes = [...new Set(data?.vehicles?.map((c) => c.fuelType))];
  const colors = [...new Set(data?.vehicles?.map((c) => c.color))];
  const transmissions = [
    ...new Set(data?.vehicles?.map((c) => c.transmission)),
  ];
  const bodyTypes = [...new Set(data?.vehicles?.map((c) => c.bodyType))];
  const userTypes = [...new Set(data?.vehicles?.map((c) => c.userType))];
  const modelYears = [...new Set(data?.vehicles?.map((c) => c.modelYear))].sort(
    (a, b) => b - a
  );

  const filteredCars = useMemo(() => {
    return data?.vehicles
      ?.filter((car) => {
        if (car.price > filters.budget) return false;
        if (car.kmDriven > filters.kmDriven) return false;
        if (filters.fuelType && car.fuelType !== filters.fuelType) return false;
        if (filters.modelYear && car.modelYear !== Number(filters.modelYear))
          return false;
        if (filters.brand && car.brand !== filters.brand) return false;
        if (filters.color && car.color !== filters.color) return false;
        if (filters.transmission && car.transmission !== filters.transmission)
          return false;
        if (filters.bodyType && car.bodyType !== filters.bodyType) return false;
        if (filters.userType && car.userType !== filters.userType) return false;
        if (filters.search && !car.name.toLowerCase().includes(filters.search))
          return false;
        return true;
      })
      .sort((a, b) => {
        if (filters.sortOrder === "Low to High") return a.price - b.price;
        if (filters.sortOrder === "High to Low") return b.price - a.price;
        return 0;
      });
  }, [filters, data]);

  return (
    <>
      <div className="mt-20">
        <ResponsiveBanner
          desktopSrc="https://www.skyautomobiles.in/_next/image?url=%2Fimages%2Fother%2Fsell_car.webp&w=3840&q=75"
          mobileSrc="https://www.skyautomobiles.in/_next/image?url=%2Fimages%2Fother%2Fsell_car_mobile.webp&w=1080&q=75"
          altText="Sky Automobiles Contact Us Banner"
        />
      </div>

      <div className="relative min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
        {/* Floating Filter Button (Mobile) */}
        <button
          onClick={() => setShowSidebar(true)}
          className="fixed z-40 p-3 text-white bg-blue-600 rounded-full shadow-lg bottom-6 right-6 md:hidden"
        >
          <Filter className="w-5 h-5" />
        </button>

        <div className="container flex flex-col gap-6 p-4 mx-auto mt-24 md:flex-row">
          {/* Sidebar (Mobile) */}
          <AnimatePresence>
            {showSidebar && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex md:hidden"
              >
                <div
                  className="absolute inset-0 bg-black/40"
                  onClick={() => setShowSidebar(false)}
                ></div>

                <motion.aside
                  initial={{ x: "-100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "-100%" }}
                  transition={{ type: "tween", duration: 0.25 }}
                  className="relative z-50 flex flex-col w-4/5 h-full max-w-sm overflow-y-auto bg-white shadow-2xl rounded-r-2xl"
                >
                  <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-700">
                      Filters
                    </h3>
                    <button
                      onClick={() => setShowSidebar(false)}
                      className="flex items-center gap-1 px-3 py-1 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700"
                    >
                      <X className="w-4 h-4" /> Close
                    </button>
                  </div>
                  <div className="p-5 pb-24">
                    <TrueValueFilter
                      filters={filters}
                      setFilters={setFilters}
                      brands={brands}
                      fuelTypes={fuelTypes}
                      colors={colors}
                      transmissions={transmissions}
                      bodyTypes={bodyTypes}
                      userTypes={userTypes}
                      modelYears={modelYears}
                      clearFilters={() => setFilters(defaultFilters)}
                    />
                  </div>
                </motion.aside>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Sidebar (Desktop) */}
          <aside className="sticky hidden w-full p-6 space-y-4 border shadow-md h-fit bg-white/70 backdrop-blur-md md:block md:w-1/4 top-24 rounded-2xl">
            <TrueValueFilter
              filters={filters}
              setFilters={setFilters}
              brands={brands}
              fuelTypes={fuelTypes}
              colors={colors}
              transmissions={transmissions}
              bodyTypes={bodyTypes}
              userTypes={userTypes}
              modelYears={modelYears}
              clearFilters={() => setFilters(defaultFilters)}
            />
          </aside>

          {/* Main Section */}
          {loading ? (
            <div className="flex items-center justify-center w-full">
              <FaSpinner className="w-6 h-6 animate-spin" />
            </div>
          ) : (
            <div className="flex-1">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <h2 className="text-xl font-bold text-gray-800 sm:text-2xl">
                  {filteredCars?.length} Cars Found
                </h2>

                <div className="flex flex-wrap items-center justify-end w-full gap-3 sm:w-auto">
                  <input
                    type="text"
                    placeholder="Search cars..."
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        search: e.target.value.toLowerCase(),
                      }))
                    }
                    className="w-full px-4 py-2 text-sm border rounded-lg shadow-sm sm:w-56 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                  <select
                    value={filters.sortOrder}
                    onChange={(e) =>
                      setFilters((p) => ({ ...p, sortOrder: e.target.value }))
                    }
                    className="px-4 py-2 text-sm border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    <option value="">Sort By</option>
                    <option value="Low to High">Price: Low to High</option>
                    <option value="High to Low">Price: High to Low</option>
                  </select>
                </div>
              </div>

              <TrueValueGrid cars={filteredCars || []} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

/* =======================
   TrueValueGrid Component
======================= */
function TrueValueGrid({ cars }) {
  const router = useRouter();

  if (!cars || cars.length === 0)
    return (
      <div className="flex items-center justify-center w-full py-10 text-gray-500">
        No cars match your filters.
      </div>
    );

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {cars.map((car, index) => (
        <motion.div
          key={index}
          whileHover={{ scale: 1.02 }}
          className="overflow-hidden transition-all duration-300 bg-white border border-gray-100 shadow-md rounded-2xl hover:shadow-2xl"
        >
          <div className="relative">
            <img
              src={car?.images?.[0]?.url}
              alt={car?.name || "Car image"}
              className="object-cover w-full h-48 rounded-t-2xl"
            />
            <div className="absolute px-3 py-1 text-xs font-semibold text-white bg-blue-600 rounded-full shadow top-3 right-3">
              ₹{(car.price / 100000).toFixed(1)} Lakh
            </div>
          </div>
          <div className="p-4">
            <h3 className="text-base font-semibold text-gray-800">
              {car.name}
            </h3>
            <p className="mb-1 text-sm text-gray-500">
              {car.modelYear} • {car.kmDriven} km
            </p>
            <p className="mb-3 text-xs text-gray-400">
              {car.brand} | {car.fuelType} | {car.transmission}
            </p>
            <Link
              href={`/truevalue/buy-a-car/${car._id}`}
              // onClick={() => router.push(`/truevalue/buy-a-car/${car._id}`)}
              className="flex items-center justify-center w-full py-2 text-sm font-semibold text-white transition-all rounded-md bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
            >
              View Details
            </Link>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* =======================
   TrueValueFilter Component
======================= */
function TrueValueFilter({
  filters,
  setFilters,
  brands,
  fuelTypes,
  colors,
  transmissions,
  bodyTypes,
  userTypes,
  modelYears,
  clearFilters,
}) {
  const [openSections, setOpenSections] = useState({
    budget: true,
    kmDriven: true,
    fuelType: true,
    brand: true,
    color: false,
    transmission: false,
    bodyType: false,
    userType: false,
    modelYear: false,
  });

  const toggle = (key) =>
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));

  const sectionHeader = (label, key) => (
    <button
      type="button"
      onClick={() => toggle(key)}
      className="flex items-center justify-between w-full py-2 text-sm font-semibold text-gray-700 border-b border-gray-200"
    >
      <span>{label}</span>
      {openSections[key] ? (
        <ChevronUp className="w-4 h-4 text-gray-500" />
      ) : (
        <ChevronDown className="w-4 h-4 text-gray-500" />
      )}
    </button>
  );

  const filterGroups = [
    [
      "Budget",
      "budget",
      [
        { label: "Under ₹2 Lakh", value: 200000 },
        { label: "Under ₹5 Lakh", value: 500000 },
        { label: "Under ₹10 Lakh", value: 1000000 },
        { label: "Under ₹15 Lakh", value: 1500000 },
        { label: "Under ₹20 Lakh", value: 2000000 },
      ],
      filters.budget,
      (v) => setFilters((p) => ({ ...p, budget: Number(v) })),
    ],
    [
      "KM Driven",
      "kmDriven",
      [
        { label: "Under 20,000 km", value: 20000 },
        { label: "Under 50,000 km", value: 50000 },
        { label: "Under 1,00,000 km", value: 100000 },
        { label: "Under 2,00,000 km", value: 200000 },
      ],
      filters.kmDriven,
      (v) => setFilters((p) => ({ ...p, kmDriven: Number(v) })),
    ],
    [
      "Fuel Type",
      "fuelType",
      fuelTypes,
      filters.fuelType,
      (v) => setFilters((p) => ({ ...p, fuelType: v })),
    ],
    [
      "Brand",
      "brand",
      brands,
      filters.brand,
      (v) => setFilters((p) => ({ ...p, brand: v })),
    ],
    [
      "Color",
      "color",
      colors,
      filters.color,
      (v) => setFilters((p) => ({ ...p, color: v })),
    ],
    [
      "Transmission",
      "transmission",
      transmissions,
      filters.transmission,
      (v) => setFilters((p) => ({ ...p, transmission: v })),
    ],
    [
      "Body Type",
      "bodyType",
      bodyTypes,
      filters.bodyType,
      (v) => setFilters((p) => ({ ...p, bodyType: v })),
    ],
    [
      "User Type",
      "userType",
      userTypes,
      filters.userType,
      (v) => setFilters((p) => ({ ...p, userType: v })),
    ],
    [
      "Model Year",
      "modelYear",
      modelYears,
      filters.modelYear,
      (v) => setFilters((p) => ({ ...p, modelYear: v })),
    ],
  ];

  return (
    <div className="flex flex-col gap-4">
      {filterGroups.map(([label, key, options, selected, setter]) => (
        <div key={key}>
          {sectionHeader(label, key)}
          <AnimatePresence>
            {openSections[key] && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="flex flex-col gap-1 mt-2 text-sm"
              >
                {Array.isArray(options)
                  ? options.map((opt) =>
                      typeof opt === "string" ? (
                        <button
                          key={opt}
                          onClick={() => setter(opt)}
                          className={`px-2 py-1 text-left rounded hover:bg-gray-100 ${
                            selected === opt ? "bg-blue-100 font-semibold" : ""
                          }`}
                        >
                          {opt}
                        </button>
                      ) : (
                        <button
                          key={opt.value}
                          onClick={() => setter(opt.value)}
                          className={`px-2 py-1 text-left rounded hover:bg-gray-100 ${
                            selected === opt.value
                              ? "bg-blue-100 font-semibold"
                              : ""
                          }`}
                        >
                          {opt.label}
                        </button>
                      )
                    )
                  : null}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
      <button
        onClick={clearFilters}
        className="px-4 py-2 mt-4 text-sm font-semibold text-white bg-red-500 rounded hover:bg-red-600"
      >
        Clear All Filters
      </button>
    </div>
  );
}
