import G6 from "@antv/g6";

const data = {
  nodes: [
    {
      id: "node1",
      label: "Circle1",
      x: 150,
      y: 150,
      style: {
        // The style for the keyShape
        fill: 'r(0.5, 0.5, 1) 0:#984431 1:#37467B',
        lineWidth: 1,
        radius: 7,
      }
    },
    {
      id: "node2",
      label: "Circle2",
      x: 400,
      y: 150,
      style: {
        // The style for the keyShape
        fill: 'r(0.5, 0.5, 1) 0:#7BFFC8 1:#37467B',
        lineWidth: 1,
        radius: 7,
      }
    },
    {
      id: "node3",
      shape: 'rect',
      label: "My Node",
      x: 275,
      y: 350,
      style: {
        // The style for the keyShape
        fill: 'r(0.5, 0.5, 1) 0:#7B98FF 1:#37467B',
        lineWidth: 1,
        radius: 7,
      },
      linkPoints: {
        top: true,
        bottom: true
      }
    }
  ],
  edges: [
    {
      source: "node1",
      target: "node2"
    },
    {
      source: "node2",
      target: "node3"
    },
    {
      source: "node1",
      target: "node3"
    },
  ]
};

const graph = new G6.Graph({
  container: "container",
  width: 500,
  height: 500,
  color: 'r(0.5, 0.5, 1) 0:#7B98FF 1:#37467B',
  defaultNode: {
    size: [100],
    color: "#5B8FF9",
    shape: 'rect',
    style: {
      lineWidth: 3
    },
    labelCfg: {
      style: {
        fill: "#fff",
        fontSize: 20
      }
    }
  },
  defaultEdge: {
    style: {
      stroke: "#e2e2e2"
    }
  },
  nodeStateStyles: {
    // The state styles defined as following will take effect on keyShape only. To define state styles on other shapes, refer to the link Configure Styles for State above
    hover: {
      fillOpacity: 0.5,
      lineWidth: 5,
      color: "#000000",
      labelCfg: {
        style: {
          fill: "#000000",
          fontSize: 20
        }
      }
    },
  }
});

graph.data(data);
graph.render();




// Listen to the mouse enter event on node
graph.on('node:mouseenter', (evt) => {
  const node = evt.item;
  // activate the hover state of the node
  graph.setItemState(node, 'hover', true);
});
// Listen to the mouse leave event on node
graph.on('node:mouseleave', (evt) => {
  const node = evt.item;
  // inactivate the hover state of the node
  graph.setItemState(node, 'hover', false);
});
