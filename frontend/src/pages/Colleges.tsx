import { useState, useEffect } from "react";
import api from "../api/axios"; // ✅ adjust path if needed
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Badge } from "../components/ui/badge";
import { MapPin, Users, GraduationCap,Eye } from "lucide-react";

const Colleges = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [locations, setLocations] = useState<any[]>([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [colleges, setColleges] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ Fetch locations on mount
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await api.get("/locations/");
        setLocations(res.data);
      } catch (err) {
        console.error("Error fetching locations", err);
      }
    };
    fetchLocations();
  }, []);

  // ✅ Fetch autocomplete suggestions
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchTerm.trim().length > 1) {
        try {
          const res = await api.get("/college/autocomplete/", {
            params: { q: searchTerm },
          });
          setSuggestions(res.data);
        } catch (err) {
          console.error("Error fetching suggestions", err);
        }
      } else {
        setSuggestions([]);
      }
    };

    const delayDebounce = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  // ✅ Fetch colleges by name
  const fetchCollegesByName = async (name?: string) => {
    const query = name || searchTerm;
    if (!query.trim()) {
      setError("Please enter a college name");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const res = await api.post("/college/search/name/", { name: query });
      setColleges(res.data);
      setSuggestions([]); // close dropdown
    } catch (err: any) {
      setColleges([]);
      setError(err.response?.data?.error || err.message || "Failed to fetch colleges");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fetch colleges by location
  const fetchCollegesByLocation = async (location?: string) => {
    const loc = location || selectedLocation;
    if (!loc.trim()) {
      setError("Please select a location");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const res = await api.post("/college/search/location/", { location: loc });
      setColleges(res.data);
    } catch (err: any) {
      setColleges([]);
      setError(err.response?.data?.error || err.message || "Failed to fetch colleges");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <GraduationCap className="h-16 w-16 text-primary mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Select Government College
          </h1>
          <p className="text-muted-foreground">
            Find government colleges by name or location
          </p>
        </div>

        {/* Search & Filters */}
        <Card className="shadow-card mb-8">
          <CardHeader>
            <CardTitle className="text-primary">Search & Filter Colleges</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              {/* Search with autocomplete */}
              <div className="relative w-full">
                <div className="flex gap-2">
                  <Input
                    placeholder="Search by college name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full"
                  />
                  <Button onClick={() => fetchCollegesByName()}>Search</Button>
                </div>

                {/* Suggestions */}
                {suggestions.length > 0 && (
                  <div className="absolute top-full mt-1 w-full bg-white border rounded shadow-md z-10">
                    {suggestions.map((college) => (
                      <div
                        key={college.id}
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          setSearchTerm(college.name);
                          fetchCollegesByName(college.name);
                        }}
                      >
                        {college.name} – {college.location}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Location dropdown */}
              <Select
                value={selectedLocation}
                onValueChange={(val) => {
                  setSelectedLocation(val);
                  fetchCollegesByLocation(val);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Location" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((loc: any) => (
                    <SelectItem key={loc.id || loc.name} value={loc.name}>
                      {loc.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="space-y-6">
          {loading && <p className="text-center">Loading...</p>}
          {error && <p className="text-center text-red-500">{error}</p>}
          {!loading && colleges.length === 0 && !error && (
            <p className="text-center text-gray-500">No colleges found</p>
          )}

          {colleges.map((college) => (
            <Card
              key={college.id}
              className="shadow-card hover:shadow-elevated transition-smooth"
            >
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      {college.name}
                    </h3>
                    <div className="flex items-center text-muted-foreground mb-2 font-bold">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{college.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground font-bold">
                      <Users className="h-4 w-4" />
                      <span>Seats: {college.no_of_seats}</span>
                    </div>
                  </div>
                  
                  <button className="flex items-center gap-2 bg-blue-600 text-white font-bold px-4 py-2 rounded-lg hover:bg-blue-700 transition"><Eye className="w-5 h-5"/>360° View</button>

                  <Badge variant="secondary" className="mt-4 lg:mt-0">
                    Govt. College
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Colleges;
