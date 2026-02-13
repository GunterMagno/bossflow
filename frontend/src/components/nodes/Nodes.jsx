// ============================================================
// File: Nodes.jsx
// Description: Custom ReactFlow node type component definitions.
// ============================================================
import React from "react";
import { Handle, Position, NodeResizer } from "reactflow";
import "./Nodes.css";
import {
  FiZap,
  FiGitBranch,
  FiCircle,
  FiWatch,
  FiTool,
  FiMapPin,
  FiClock,
  FiStar,
} from 'react-icons/fi';

const positions = [
  { pos: Position.Top, name: "top" },
  { pos: Position.Right, name: "right" },
  { pos: Position.Bottom, name: "bottom" },
  { pos: Position.Left, name: "left" },
];

/**
 * Component that renders the connection handles of a node.
 * Creates input and output handles at all four positions (top, right, bottom, left).
 *
 * @param {Object} props - Component properties
 * @param {string} props.nodeId - Node ID to ensure unique handles
 * @param {string} props.color - Handle background color based on node type
 * @returns {JSX.Element} Set of handles for the node
 */
const Handles = ({ nodeId = '', color = 'var(--handle-default)' }) => (
  <>
    {positions.map(({ pos, name }) => (
      <React.Fragment key={name}>
        <Handle
          id={`${nodeId}-${name}-target`}
          type="target"
          position={pos}
          isConnectable={true}
          style={{ width: 12, height: 12, borderRadius: 6, zIndex: 10, background: color }}
        />
        <Handle
          id={`${nodeId}-${name}-source`}
          type="source"
          position={pos}
          isConnectable={true}
          style={{ width: 12, height: 12, borderRadius: 6, background: color, zIndex: 10 }}
        />
      </React.Fragment>
    ))}
  </>
);

/**
 * Simple component to display a node title.
 *
 * @param {Object} props - Component properties
 * @param {string} props.value - Title text to display
 * @returns {JSX.Element} Span element with the node title
 */
const NodeTitle = ({ value }) => {
  return <span className="node-title">{value}</span>;
};

/**
 * Decision node type component.
 * Represents a branching or decision point in the diagram flow.
 *
 * @param {Object} props - Component properties
 * @param {string} props.id - Unique node ID
 * @param {Object} props.data - Node data (title, description, etc.)
 * @param {Object} props.style - CSS styles applied to the node
 * @param {boolean} props.selected - Whether the node is selected
 * @returns {JSX.Element} Decision node element
 */
export const DecisionNode = ({ id, data, style, selected }) => (
  <article className={`node decision-node ${selected ? 'selected' : ''}`} style={style}>
    <NodeResizer minWidth={100} minHeight={30} isVisible={selected} handleStyle={{
      width: '8px',
      height: '8px',
      backgroundColor: selected ? 'var(--node-decision)' : 'transparent',
      border: '1px solid white',
      borderRadius: '2px',
    }} />
    <Handles nodeId={id} color={'var(--node-decision)'} />
    <span className="icon"><FiGitBranch className="node-icon icon-decision" role="img" aria-label="Icono de decisión" /></span>
    <NodeTitle value={data.title} />
  </article>
);

/**
 * Action node type component.
 * Represents an action or activity in the diagram flow.
 *
 * @param {Object} props - Component properties
 * @param {string} props.id - Unique node ID
 * @param {Object} props.data - Node data (title, description, etc.)
 * @param {Object} props.style - CSS styles applied to the node
 * @param {boolean} props.selected - Whether the node is selected
 * @returns {JSX.Element} Action node element
 */
export const ActionNode = ({ id, data, style, selected }) => (
  <article className={`node action-node ${selected ? 'selected' : ''}`} style={style}>
    <NodeResizer minWidth={100} minHeight={30} isVisible={selected} handleStyle={{
      width: '8px',
      height: '8px',
      backgroundColor: selected ? 'var(--node-action)' : 'transparent',
      border: '1px solid white',
      borderRadius: '2px',
    }} />
    <Handles nodeId={id} color={'var(--node-action)'} />
    <span className="icon"><FiZap className="node-icon icon-action" role="img" aria-label="Icono de acción" /></span>
    <NodeTitle value={data.title} />
  </article>
);

/**
 * Phase node type component.
 * Represents a phase or stage of the process in the diagram.
 *
 * @param {Object} props - Component properties
 * @param {string} props.id - Unique node ID
 * @param {Object} props.data - Node data (title, description, etc.)
 * @param {Object} props.style - CSS styles applied to the node
 * @param {boolean} props.selected - Whether the node is selected
 * @returns {JSX.Element} Phase node element
 */
export const PhaseNode = ({ id, data, style, selected }) => (
  <article className={`node phase-node ${selected ? 'selected' : ''}`} style={style}>
    <NodeResizer minWidth={100} minHeight={30} isVisible={selected} handleStyle={{
      width: '8px',
      height: '8px',
      backgroundColor: selected ? 'var(--node-phase)' : 'transparent',
      border: '1px solid white',
      borderRadius: '2px',
    }} />
    <Handles nodeId={id} color={'var(--node-phase)'} />
    <span className="icon"><FiWatch className="node-icon icon-phase" role="img" aria-label="Icono de fase" /></span>
    <NodeTitle value={data.title} />
  </article>
);

/**
 * Effect or mechanic node type component.
 * Represents an effect or system mechanic in the diagram.
 *
 * @param {Object} props - Component properties
 * @param {string} props.id - Unique node ID
 * @param {Object} props.data - Node data (title, description, etc.)
 * @param {Object} props.style - CSS styles applied to the node
 * @param {boolean} props.selected - Whether the node is selected
 * @returns {JSX.Element} Effect node element
 */
export const EffectNode = ({ id, data, style, selected }) => (
  <article className={`node effect-node ${selected ? 'selected' : ''}`} style={style}>
    <NodeResizer minWidth={100} minHeight={30} isVisible={selected} handleStyle={{
      width: '8px',
      height: '8px',
      backgroundColor: selected ? 'var(--node-effect)' : 'transparent',
      border: '1px solid white',
      borderRadius: '2px',
    }} />
    <Handles nodeId={id} color={'var(--node-effect)'} />
    <span className="icon"><FiTool className="node-icon icon-effect" role="img" aria-label="Icono de mecánica" /></span>
    <NodeTitle value={data.title} />
  </article>
);

/**
 * Start node type component.
 * Represents the starting point of a flow in the diagram.
 *
 * @param {Object} props - Component properties
 * @param {string} props.id - Unique node ID
 * @param {Object} props.data - Node data (title, description, etc.)
 * @param {Object} props.style - CSS styles applied to the node
 * @param {boolean} props.selected - Whether the node is selected
 * @returns {JSX.Element} Start node element
 */
export const StartNode = ({ id, data, style, selected }) => (
  <article className={`node start-node ${selected ? 'selected' : ''}`} style={style}>
    <NodeResizer minWidth={80} minHeight={30} isVisible={selected} handleStyle={{
      width: '8px',
      height: '8px',
      backgroundColor: selected ? 'var(--node-start-end)' : 'transparent',
      border: '1px solid white',
      borderRadius: '2px',
    }} />
    <Handles nodeId={id} color={'var(--node-start-end)'} />
    <span className="icon"><FiCircle className="node-icon icon-start-end" role="img" aria-label="Icono de evento" /></span>
    <NodeTitle value={data?.title || 'Start'} />
  </article>
);

/**
 * End node type component.
 * Represents the ending point of a flow in the diagram.
 *
 * @param {Object} props - Component properties
 * @param {string} props.id - Unique node ID
 * @param {Object} props.data - Node data (title, description, etc.)
 * @param {Object} props.style - CSS styles applied to the node
 * @param {boolean} props.selected - Whether the node is selected
 * @returns {JSX.Element} End node element
 */
export const EndNode = ({ id, data, style, selected }) => (
  <article className={`node end-node ${selected ? 'selected' : ''}`} style={style}>
    <NodeResizer minWidth={80} minHeight={30} isVisible={selected} handleStyle={{
      width: '8px',
      height: '8px',
      backgroundColor: selected ? 'var(--node-start-end)' : 'transparent',
      border: '1px solid white',
      borderRadius: '2px',
    }} />
    <Handles nodeId={id} color={'var(--node-start-end)'} />
    <span className="icon"><FiCircle className="node-icon icon-start-end" role="img" aria-label="Icono de evento" /></span>
    <NodeTitle value={data?.title || 'End'} />
  </article>
);

/**
 * Position node type component.
 * Represents a specific position or location in the diagram.
 *
 * @param {Object} props - Component properties
 * @param {string} props.id - Unique node ID
 * @param {Object} props.data - Node data (title, description, etc.)
 * @param {Object} props.style - CSS styles applied to the node
 * @param {boolean} props.selected - Whether the node is selected
 * @returns {JSX.Element} Position node element
 */
export const PositionNode = ({ id, data, style, selected }) => (
  <article className={`node position-node ${selected ? 'selected' : ''}`} style={style}>
    <NodeResizer minWidth={100} minHeight={30} isVisible={selected} handleStyle={{
      width: '8px',
      height: '8px',
      backgroundColor: selected ? 'var(--node-position)' : 'transparent',
      border: '1px solid white',
      borderRadius: '2px',
    }} />
    <Handles nodeId={id} color={'var(--node-position)'} />
    <span className="icon"><FiMapPin className="node-icon icon-position" role="img" aria-label="Icono de posición" /></span>
    <NodeTitle value={data.title} />
  </article>
);

/**
 * Timer node type component.
 * Represents a timer or countdown in the diagram.
 *
 * @param {Object} props - Component properties
 * @param {string} props.id - Unique node ID
 * @param {Object} props.data - Node data (title, description, etc.)
 * @param {Object} props.style - CSS styles applied to the node
 * @param {boolean} props.selected - Whether the node is selected
 * @returns {JSX.Element} Timer node element
 */
export const TimerNode = ({ id, data, style, selected }) => (
  <article className={`node timer-node ${selected ? 'selected' : ''}`} style={style}>
    <NodeResizer minWidth={100} minHeight={30} isVisible={selected} handleStyle={{
      width: '8px',
      height: '8px',
      backgroundColor: selected ? 'var(--node-timer)' : 'transparent',
      border: '1px solid white',
      borderRadius: '2px',
    }} />
    <Handles nodeId={id} color={'var(--node-timer)'} />
    <span className="icon"><FiClock className="node-icon icon-timer" role="img" aria-label="Icono de temporizador" /></span>
    <NodeTitle value={data.title} />
  </article>
);

/**
 * Ability node type component.
 * Represents a special ability or capability in the diagram.
 *
 * @param {Object} props - Component properties
 * @param {string} props.id - Unique node ID
 * @param {Object} props.data - Node data (title, description, etc.)
 * @param {Object} props.style - CSS styles applied to the node
 * @param {boolean} props.selected - Whether the node is selected
 * @returns {JSX.Element} Ability node element
 */
export const AbilityNode = ({ id, data, style, selected }) => (
  <article className={`node ability-node ${selected ? 'selected' : ''}`} style={style}>
    <NodeResizer minWidth={100} minHeight={30} isVisible={selected} handleStyle={{
      width: '8px',
      height: '8px',
      backgroundColor: selected ? 'var(--node-ability)' : 'transparent',
      border: '1px solid white',
      borderRadius: '2px',
    }} />
    <Handles nodeId={id} color={'var(--node-ability)'} />
    <span className="icon"><FiStar className="node-icon icon-ability" role="img" aria-label="Icono de habilidad" /></span>
    <NodeTitle value={data.title} />
  </article>
);
