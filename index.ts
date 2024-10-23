// Travel Problem without using Djkstras, (through brute force with recursion)

interface TravelDistance {
  start: string;
  end: string;
  cost: number;
}

interface Result {
  paths: string[];
  cost: number;
}

const airports: TravelDistance[] = [
  {
    start: "ISB",
    end: "LHR",
    cost: 1000,
  },
  {
    start: "LHR",
    end: "NYC",
    cost: 750,
  },
  {
    start: "CBS",
    end: "NYC",
    cost: 775,
  },
  {
    start: "ISB",
    end: "CBS",
    cost: 575,
  },
  {
    start: "CBS",
    end: "GRC",
    cost: 731,
  },
  {
    start: "NYC",
    end: "GRC",
    cost: 459,
  },
];

const getLocations = (paths: TravelDistance[]) => {
  const locations: string[] = [];
  for (let path of paths) {
    if (!locations.includes(path.start)) {
      locations.push(path.start);
    }
    if (!locations.includes(path.end)) {
      locations.push(path.end);
    }
  }

  return locations;
};

// Recursive function to explore all paths. Hate it
function findPaths(
  currentLocation: string,
  destinationLocation: string,
  visitedLocations: Set<string>,
  path: string[],
  cost: number,
  totalPaths: TravelDistance[],
  result: Result[]
): void {
  // If we reached the destination, return
  if (currentLocation === destinationLocation) {
    result.push({ paths: [...path], cost });
    return;
  }

  // Explore all connections from the current airport
  for (const connection of totalPaths) {
    if (
      connection.start === currentLocation &&
      !visitedLocations.has(connection.end)
    ) {
      visitedLocations.add(connection.end); // Add to visited
      path.push(connection.end); // Add to path array

      // Now, search again. We cannot visit our already visited locations to avoid cycles, so can resolve
      findPaths(
        connection.end,
        destinationLocation,
        visitedLocations,
        path,
        cost + connection.cost,
        totalPaths,
        result
      );

      // Backtrack
      visitedLocations.delete(connection.end);
      path.pop();
    }
  }
}

const getShortestPath = (start: string, end: string) => {
  // first check if the location is even located inside, so no entries not in here
  if (!locations.includes(end) || !locations.includes(start)) {
    throw new Error(`Start or end location not present in airports`);
  }

  // start by checking if the path is already present to avoid more calculations
  for (let path of airports) {
    if (path.start === start && path.end === end) {
      return {
        paths: [path],
        cost: path.cost,
      };
    }
  }

  // Find all possible paths that are generated.
  let resultPaths: Result[] = [];
  findPaths(start, end, new Set([start]), [start], 0, airports, resultPaths);

  //there might be no path, so return nothing
  if (resultPaths.length === 0) {
    return "No Path Found";
  }

  // Find the path with the minimum cost
  let minPath = resultPaths[0];
  for (const p of resultPaths) {
    if (p.cost < minPath.cost) {
      minPath = p;
    }
  }

  return minPath;
};

// Main section
const locations = getLocations(airports);

console.log(getShortestPath("ISB", "LHR"));
console.log(getShortestPath("ISB", "NYC"));
console.log(getShortestPath("ISB", "GRC"));
console.log(getShortestPath("ISB", "GRC"));
console.log(getShortestPath("LHR", "ISB"));
console.log(getShortestPath("UnfoundLocation", "UnfoundLocation2"));
