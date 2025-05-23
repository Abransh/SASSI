// components/cricket/LeaderboardTable.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Search } from "lucide-react";
import useSWR from "swr";

interface LeaderboardProps {
  initialCategory?: string;
}

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function LeaderboardTable({ initialCategory = "batting" }: LeaderboardProps) {
  const [category, setCategory] = useState(initialCategory);
  const [sortField, setSortField] = useState<string>("runs");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Fetch leaderboard data
  const { data, error, isLoading } = useSWR(
    `/api/cricket/leaderboard?category=${category}`,
    fetcher
  );

  // Handle tab change
  const handleTabChange = (value: string) => {
    setCategory(value);
    // Reset sort field based on category
    setSortField(value === "batting" ? "runs" : "wickets");
    setSortOrder("desc");
  };

  // Sort data
  const sortData = (data: any[]) => {
    if (!data) return [];

    const sorted = [...data].sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];

      // Handle numeric strings
      if (typeof aValue === 'string' && !isNaN(parseFloat(aValue))) {
        aValue = parseFloat(aValue);
      }
      if (typeof bValue === 'string' && !isNaN(parseFloat(bValue))) {
        bValue = parseFloat(bValue);
      }

      // Handle undefined or null
      if (aValue === undefined || aValue === null) return 1;
      if (bValue === undefined || bValue === null) return -1;

      // Compare values
      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return sorted;
  };

  // Filter data by search query
  const filterData = (data: any[]) => {
    if (!data || !searchQuery) return data;

    return data.filter(item =>
      item.player.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.player.team.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  // Process data
  const processedData = filterData(sortData(data || []));

  // Toggle sort order
  const toggleSort = (field: string) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("desc");
    }
  };

  return (
    <div className="space-y-4">
      {/* Search and filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            placeholder="Search players or teams..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Tab navigation */}
      <Tabs value={category} onValueChange={handleTabChange}>
        <TabsList className="w-full mb-4">
          <TabsTrigger value="batting" className="flex-1">Batting</TabsTrigger>
          <TabsTrigger value="bowling" className="flex-1">Bowling</TabsTrigger>
        </TabsList>

        {/* Batting leaderboard */}
        <TabsContent value="batting">
          <div className="rounded-md border">
            <Table>
              <TableCaption>
                {isLoading
                  ? "Loading batting statistics..."
                  : `Showing ${processedData.length} batsmen`
                }
              </TableCaption>

              <TableHeader>
                <TableRow>
                  <TableHead>Player</TableHead>
                  <TableHead className="w-[80px]">
                    <button
                      className="flex items-center"
                      onClick={() => toggleSort("innings")}
                    >
                      Inn
                      {sortField === "innings" && (
                        <ArrowUpDown size={14} className="ml-1" />
                      )}
                    </button>
                  </TableHead>
                  <TableHead className="w-[80px]">
                    <button
                      className="flex items-center"
                      onClick={() => toggleSort("runs")}
                    >
                      Runs
                      {sortField === "runs" && (
                        <ArrowUpDown size={14} className="ml-1" />
                      )}
                    </button>
                  </TableHead>
                  <TableHead className="w-[80px]">4s</TableHead>
                  <TableHead className="w-[80px]">6s</TableHead>
                  <TableHead className="w-[80px]">
                    <button
                      className="flex items-center"
                      onClick={() => toggleSort("average")}
                    >
                      Avg
                      {sortField === "average" && (
                        <ArrowUpDown size={14} className="ml-1" />
                      )}
                    </button>
                  </TableHead>
                  <TableHead className="w-[80px]">
                    <button
                      className="flex items-center"
                      onClick={() => toggleSort("strikeRate")}
                    >
                      SR
                      {sortField === "strikeRate" && (
                        <ArrowUpDown size={14} className="ml-1" />
                      )}
                    </button>
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      <div className="flex justify-center items-center h-full">
                        <div className="animate-spin h-6 w-6 border-2 border-orange-500 border-t-transparent rounded-full mr-2"></div>
                        Loading...
                      </div>
                    </TableCell>
                  </TableRow>
                ) : error ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center text-red-500">
                      Failed to load leaderboard data
                    </TableCell>
                  </TableRow>
                ) : processedData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center text-gray-500">
                      No batting data found
                      {searchQuery && " matching your search"}
                    </TableCell>
                  </TableRow>
                ) : (
                  processedData.map((item, index) => (
                    <TableRow key={item.player.id}>
                      <TableCell className="font-medium">
                        <Link
                          href={`/cricket/players/${item.player.id}`}
                          className="hover:text-orange-600"
                        >
                          <div>{item.player.name}</div>
                          <div className="text-xs text-gray-500">
                            {item.player.team.name}
                          </div>
                        </Link>
                      </TableCell>
                      <TableCell>{item.innings}</TableCell>
                      <TableCell>{item.runs}</TableCell>
                      <TableCell>{item.fours}</TableCell>
                      <TableCell>{item.sixes}</TableCell>
                      <TableCell>{item.average}</TableCell>
                      <TableCell>{item.strikeRate}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        {/* Bowling leaderboard */}
        <TabsContent value="bowling">
          <div className="rounded-md border">
            <Table>
              <TableCaption>
                {isLoading
                  ? "Loading bowling statistics..."
                  : `Showing ${processedData.length} bowlers`
                }
              </TableCaption>

              <TableHeader>
                <TableRow>
                  <TableHead>Player</TableHead>
                  <TableHead className="w-[80px]">
                    <button
                      className="flex items-center"
                      onClick={() => toggleSort("innings")}
                    >
                      Inn
                      {sortField === "innings" && (
                        <ArrowUpDown size={14} className="ml-1" />
                      )}
                    </button>
                  </TableHead>
                  <TableHead className="w-[80px]">
                    <button
                      className="flex items-center"
                      onClick={() => toggleSort("overs")}
                    >
                      O
                      {sortField === "overs" && (
                        <ArrowUpDown size={14} className="ml-1" />
                      )}
                    </button>
                  </TableHead>
                  <TableHead className="w-[80px]">R</TableHead>
                  <TableHead className="w-[80px]">
                    <button
                      className="flex items-center"
                      onClick={() => toggleSort("wickets")}
                    >
                      W
                      {sortField === "wickets" && (
                        <ArrowUpDown size={14} className="ml-1" />
                      )}
                    </button>
                  </TableHead>
                  <TableHead className="w-[80px]">
                    <button
                      className="flex items-center"
                      onClick={() => toggleSort("economyRate")}
                    >
                      Econ
                      {sortField === "economyRate" && (
                        <ArrowUpDown size={14} className="ml-1" />
                      )}
                    </button>
                  </TableHead>
                  <TableHead className="w-[80px]">
                    <button
                      className="flex items-center"
                      onClick={() => toggleSort("average")}
                    >
                      Avg
                      {sortField === "average" && (
                        <ArrowUpDown size={14} className="ml-1" />
                      )}
                    </button>
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      <div className="flex justify-center items-center h-full">
                        <div className="animate-spin h-6 w-6 border-2 border-orange-500 border-t-transparent rounded-full mr-2"></div>
                        Loading...
                      </div>
                    </TableCell>
                  </TableRow>
                ) : error ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center text-red-500">
                      Failed to load leaderboard data
                    </TableCell>
                  </TableRow>
                ) : processedData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center text-gray-500">
                      No bowling data found
                      {searchQuery && " matching your search"}
                    </TableCell>
                  </TableRow>
                ) : (
                  processedData.map((item, index) => (
                    <TableRow key={item.player.id}>
                      <TableCell className="font-medium">
                        <Link
                          href={`/cricket/players/${item.player.id}`}
                          className="hover:text-orange-600"
                        >
                          <div>{item.player.name}</div>
                          <div className="text-xs text-gray-500">
                            {item.player.team.name}
                          </div>
                        </Link>
                      </TableCell>
                      <TableCell>{item.innings}</TableCell>
                      <TableCell>
                        {typeof item.overs === 'number' ? item.overs.toFixed(1) : '0.0'}
                      </TableCell>
                      <TableCell>{item.runs}</TableCell>
                      <TableCell>{item.wickets}</TableCell>
                      <TableCell>{item.economyRate}</TableCell>
                      <TableCell>{item.average}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}