'use client';
import { useEffect, useRef } from 'react';

export default function DepartmentChart({ employees }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!employees.length) return;

    // Calculate department counts
    const deptCount = {};
    employees.forEach(emp => {
      deptCount[emp.department] = (deptCount[emp.department] || 0) + 1;
    });

    const departments = Object.keys(deptCount);
    const counts = Object.values(deptCount);
    const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const radius = Math.min(width, height) / 2 - 40;
    const centerX = width / 2;
    const centerY = height / 2;

    ctx.clearRect(0, 0, width, height);

    // Draw pie chart
    let startAngle = -Math.PI / 2;
    const total = counts.reduce((a, b) => a + b, 0);

    departments.forEach((dept, i) => {
      const sliceAngle = (counts[i] / total) * 2 * Math.PI;
      
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle);
      ctx.closePath();
      ctx.fillStyle = colors[i % colors.length];
      ctx.fill();

      // Draw label
      const midAngle = startAngle + sliceAngle / 2;
      const labelRadius = radius * 0.7;
      const labelX = centerX + Math.cos(midAngle) * labelRadius;
      const labelY = centerY + Math.sin(midAngle) * labelRadius;
      
      if (counts[i] / total > 0.05) {
        ctx.fillStyle = 'white';
        ctx.font = 'bold 14px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(Math.round((counts[i] / total) * 100) + '%', labelX, labelY);
      }

      startAngle += sliceAngle;
    });

    // Legend
    const legendY = 20;
    const legendX = 20;
    departments.forEach((dept, i) => {
      const y = legendY + i * 25;
      ctx.fillStyle = colors[i % colors.length];
      ctx.fillRect(legendX, y, 12, 12);
      ctx.fillStyle = '#333';
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.fillText(`${dept} (${counts[i]})`, legendX + 18, y + 6);
    });

  }, [employees]);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Department Distribution</h3>
      <div className="flex justify-center">
        <canvas ref={canvasRef} width={500} height={400}></canvas>
      </div>
    </div>
  );
}