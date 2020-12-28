import * as d3 from "d3";
import statistics from "./homicidios-negros-e-nao-negros.csv";

const height = 600,
  width = 800,
  margin = 90;

d3.csv(statistics).then((data) => {
  data.forEach((d) => (d.negro = +d.negro));
  data.forEach((d) => (d.naonegro = +d.naonegro));
  render(data);
});

const render = (data) => {
  const svg = d3
    .select(".scatter-plot")
    .append("svg")
    .attr("viewBox", [0, 0, width, height])
    .attr("height", height)
    .attr("width", width);

  console.log(d3.min(data, (d) => d.periodo));

  const xScale = d3
    .scaleLinear()
    .domain([d3.min(data, (d) => d.periodo), d3.max(data, (d) => d.periodo)])
    .range([margin, width - margin]);

  const min = d3.min(data, (d) => d.naonegro);
  const max = d3.max(data, (d) => d.negro);

  const yScale = d3
    .scaleLinear()
    .domain([min, max])
    .range([height - margin, margin]);

  svg
    .append("g")
    .attr("transform", `translate(0, ${height - margin})`)
    .attr("id", "x-axis")
    .call(d3.axisBottom(xScale)
    .tickSizeOuter(0));

  svg
    .append("g")
    .attr("transform", `translate(${margin}, 0)`)
    .attr("id", "y-axis")
    .call(d3.axisLeft(yScale));

  svg
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("class", "dot")
    .attr("data-xvalue", (d) => d.periodo)
    .attr("data-yvalue", (d) => d.negro)
    .attr("r", 5)
    .attr("stroke", "black")
    .attr("fill", "black")
    .attr("fill-opacity", 0.2)
    .attr("stroke-width", 2)
    .attr("cx", (d) => xScale(d.periodo))
    .attr("cy", (d) => yScale(d.negro));

  svg
    .selectAll(".circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("class", "dot")
    .attr("data-xvalue", (d) => d.periodo)
    .attr("data-yvalue", (d) => d.negro)
    .attr("r", 5)
    .attr("stroke", "steelblue")
    .attr("fill", "steelblue")
    .attr("fill-opacity", 0.2)
    .attr("stroke-width", 2)
    .attr("cx", (d) => xScale(d.periodo))
    .attr("cy", (d) => yScale(d.naonegro));

  var legend = svg
    .append("g")
    .attr("class", "legend")
    .attr("x", width - 65)
    .attr("y", 25)
    .attr("height", 100)
    .attr("width", 100);

  legend
    .append("circle")
    .attr("cx", width - 95)
    .attr("cy", 25)
    .attr("r", 5)
    .attr("stroke", "black")
    .attr("stroke-width", 1)
    .attr("fill", "steelblue")
    .attr("fill-opacity", 0.2)
    .style("fill", "black");

  legend
    .append("text")
    .attr("x", width - 75)
    .attr("y", 30)
    .style("font-size", "12px")
    .text("black");

  legend
    .append("circle")
    .attr("cx", width - 95)
    .attr("cy", 50)
    .attr("r", 5)
    .style("fill", "steelblue")
    .attr("fill-opacity", 0.2)
    .attr("stroke", "steelblue")
    .attr("strok-width", 2);

  legend
    .append("text")
    .attr("x", width - 75)
    .attr("y", 53)
    .style("font-size", "12px")
    .text("white");
};

function App() {
  return (
    <div className="scatter-container">
      <h3 id="title">Brazilian Crime Statistics By Race</h3>
      <div className="scatter-plot"></div>
    </div>
  );
}

export default App;
