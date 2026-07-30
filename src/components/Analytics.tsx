import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const data = [
  { site: 'Pulmonary', month: 'Jan', rate: 85 },
  { site: 'Pulmonary', month: 'Feb', rate: 88 },
  { site: 'Pulmonary', month: 'Mar', rate: 92 },
  { site: 'Extra-pulmonary', month: 'Jan', rate: 70 },
  { site: 'Extra-pulmonary', month: 'Feb', rate: 75 },
  { site: 'Extra-pulmonary', month: 'Mar', rate: 78 },
  { site: 'Pediatric', month: 'Jan', rate: 80 },
  { site: 'Pediatric', month: 'Feb', rate: 82 },
  { site: 'Pediatric', month: 'Mar', rate: 85 },
];

export default function Analytics() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const margin = { top: 30, right: 30, bottom: 30, left: 100 };
    const width = 600 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    const svg = d3.select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const months = [...new Set(data.map(d => d.month))];
    const sites = [...new Set(data.map(d => d.site))];

    const x = d3.scaleBand().range([0, width]).domain(months).padding(0.05);
    const y = d3.scaleBand().range([height, 0]).domain(sites).padding(0.05);

    svg.append('g').call(d3.axisBottom(x)).selectAll('text').attr('fill', '#94a3b8');
    svg.append('g').call(d3.axisLeft(y)).selectAll('text').attr('fill', '#94a3b8');

    const color = d3.scaleLinear<string>()
      .range(['#1e293b', '#06b6d4'])
      .domain([0, 100]);

    svg.selectAll()
      .data(data, (d: any) => d.month + ':' + d.site)
      .enter()
      .append('rect')
      .attr('x', (d: any) => x(d.month)!)
      .attr('y', (d: any) => y(d.site)!)
      .attr('width', x.bandwidth())
      .attr('height', y.bandwidth())
      .style('fill', (d: any) => color(d.rate))
      .style('rx', 4)
      .style('ry', 4);

  }, []);

  return (
    <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-2xl">
      <h2 className="text-xl font-bold text-white mb-6">Diagnostic Success Heatmap</h2>
      <svg ref={svgRef}></svg>
    </div>
  );
}
