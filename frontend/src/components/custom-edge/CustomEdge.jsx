// ============================================================
// File: CustomEdge.jsx
// Description: Custom ReactFlow edge component with delete button on selection.
// ============================================================
import { useState, useMemo } from 'react';
import { getSmoothStepPath } from 'reactflow';

/**
 * Custom edge for the flow diagram with visual effects.
 * @param {Object} props - Component properties
 * @param {string} props.id - Unique edge identifier
 * @param {number} props.sourceX - X coordinate of the source point
 * @param {number} props.sourceY - Y coordinate of the source point
 * @param {number} props.targetX - X coordinate of the target point
 * @param {number} props.targetY - Y coordinate of the target point
 * @param {string} props.sourcePosition - Position of the source connector
 * @param {string} props.targetPosition - Position of the target connector
 * @param {Object} [props.style={}] - Additional CSS styles
 * @param {string} props.markerEnd - SVG marker for the edge end
 * @param {Object} [props.data={}] - Additional edge data
 * @param {boolean} [props.selected=false] - Whether the edge is selected
 * @param {boolean} [props.animated=false] - Whether the edge should be animated
 * @returns {JSX.Element} SVG path element representing the edge
 */
const CustomEdge = ({
	id,
	sourceX,
	sourceY,
	targetX,
	targetY,
	sourcePosition,
	targetPosition,
	style = {},
	markerEnd,
	data = {},
	selected = false,
	animated = false,
}) => {
	const [edgePath] = getSmoothStepPath({ 
		sourceX, 
		sourceY, 
		sourcePosition, 
		targetX, 
		targetY, 
		targetPosition,
		
	});
	const [hover, setHover] = useState(false);

	const connecting = Boolean(data && data.connecting);

	const edgeStyle = useMemo(() => {
		const base = {
			stroke: '#e4e2e2ff',
			strokeWidth: 3.5,
			fill: 'none',
		};

		if (hover || selected) {
			return {
				...base,
				stroke: '#fff',
				strokeWidth: 4.5,
				filter: 'drop-shadow(0 0 4px rgba(255,255,255,0.2))',
				cursor: 'pointer',
				...style,
			};
		}

		if (animated) {
			return {
				...base,
				strokeDasharray: '5 5',
				...style,
			};
		}

		return { ...base, ...style };
	}, [connecting, hover, selected, animated, style]);

	return (
		<path
			id={id}
			className="react-flow__edge-path"
			d={edgePath}
			style={edgeStyle}
			markerEnd={markerEnd}
			onMouseEnter={() => setHover(true)}
			onMouseLeave={() => setHover(false)}
		/>
	);
};

export default CustomEdge;
