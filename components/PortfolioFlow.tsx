"use client";
import { useCallback, useEffect } from "react";
import ReactFlow, {
  Node,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  BackgroundVariant,
} from "reactflow";
import "reactflow/dist/style.css";
import MainNode from "./MainNode";
import DetailNode from "./DetailNode";

const nodeTypes = {
  main: MainNode,
  detail: DetailNode,
};

const initialNodes: Node[] = [
  {
    id: "main",
    type: "main",
    position: { x: 0, y: 0 },
    data: {
      name: "Mike Luu",
      description: (
        <>
          <p>
            Computer Science Student, interested in databases, automations, and
            AI
          </p>
          <hr className="my-4" />
          <p>
            Growing a startup in businees process automation with my brother at
            the moment (
            <a
              href="https://mygrid.io"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              Mygrid
            </a>
            ), please fund us.
          </p>
          <hr className="my-4" />
          <p>
            I explore math and film music sometimes. I also try{" "}
            <a
              href="https://yboard.substack.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              writing
            </a>{" "}
            and{" "}
            <a
              href="https://www.goodreads.com/user/show/184543234-mike-luu"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              reading
            </a>
            . to be more &quot;intellectual&quot;.
          </p>
          <hr className="my-4" />
          <p>
            <span
              className="cursor-pointer underline mx-1"
              onClick={() =>
                window.dispatchEvent(
                  new CustomEvent("section-click", { detail: "Projects" }),
                )
              }
            >
              Projects
            </span>{" "}
            |
            <span
              className="cursor-pointer underline mx-1"
              onClick={() =>
                window.dispatchEvent(
                  new CustomEvent("section-click", { detail: "Education" }),
                )
              }
            >
              Education
            </span>{" "}
            |
            <span
              className="cursor-pointer underline mx-1"
              onClick={() =>
                window.dispatchEvent(
                  new CustomEvent("section-click", { detail: "Experiences" }),
                )
              }
            >
              Experiences
            </span>{" "}
            |
            <span
              className="cursor-pointer underline mx-1"
              onClick={() =>
                window.dispatchEvent(
                  new CustomEvent("section-click", { detail: "Contacts" }),
                )
              }
            >
              Contacts
            </span>
          </p>
        </>
      ),
      onSectionClick: () => {},
    },
  },
];

export default function PortfolioFlow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const onSectionClick = useCallback(
    (section: string) => {
      setNodes((nds) => {
        const mainNode = nds.find((n) => n.id === "main");
        if (!mainNode) return nds;
        const existingNode = nds.find((n) => n.id === section);
        if (existingNode) {
          return nds.filter((n) => n.id !== section);
        }
        const newNode: Node = {
          id: section,
          type: "detail",
          data: { section },
          position: getNodePosition(section, mainNode.position),
        };
        // Create edge from main node to the new section node
        setEdges(eds => [...eds, { 
          id: `main-${section}`,
          source: 'main',
          target: section,
          type: 'default'
        }]);
        return [...nds, newNode];
      });
    },
    [setNodes],
  );

  const getNodePosition = (
    section: string,
    mainPosition: { x: number; y: number },
  ) => {
    const offset = 400;
    switch (section) {
      case "Projects":
        return {
          x: mainPosition.x - offset,
          y: mainPosition.y - offset / 1.5,
        };
      case "Education":
        return {
          x: mainPosition.x + 1.15 * offset,
          y: mainPosition.y - offset / 1.5,
        };
      case "Experiences":
        return {
          x: mainPosition.x - offset,
          y: mainPosition.y + offset / 1.5,
        };
      case "Contacts":
        return {
          x: mainPosition.x + 1.15 * offset,
          y: mainPosition.y + offset / 1.5,
        };
      default:
        return { x: 0, y: 0 };
    }
  };

  useEffect(() => {
    const handleSectionClick = (event: CustomEvent<string>) => {
      onSectionClick(event.detail);
    };
    window.addEventListener(
      "section-click",
      handleSectionClick as EventListener,
    );
    return () => {
      window.removeEventListener(
        "section-click",
        handleSectionClick as EventListener,
      );
    };
  }, [onSectionClick]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      nodeTypes={nodeTypes}
      fitView
      fitViewOptions={{
        padding: 0.5,
        minZoom: 1,
        maxZoom: 1,
      }}
    >
      <Background
        variant={BackgroundVariant.Lines}
        gap={12}
        color="#d2c9c0"
        style={{ backgroundColor: "#dfd6cc" }}
      />
      <Controls />
    </ReactFlow>
  );
}
