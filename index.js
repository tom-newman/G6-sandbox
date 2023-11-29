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
      type: 'rect',
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
  width: 600,
  height: 700,
  layout: {
    center: [275, 350],
  },
  modes: {
    default: [
      {
        type: 'zoom-canvas'
      },
      {
        type: 'drag-canvas'
      },
      {
        type: 'click-add-node'
      },
    ],
  },
  animate: true, // Boolean, whether to activate the animation when global changes happen
  animateCfg: {
    duration: 500, // Number, the duration of one animation
    easing: 'linearEasing', // String, the easing function
  },
  defaultNode: {
    size: [100],
    type: 'rect',
    style: {
      lineWidth: 3,
      fill: "r(0.5, 0.5, 1) 0:#983181 1:#37467B",
    },
    labelCfg: {
      style: {
        color: "#5B8FF9",
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
    detailed: {
      size: [200],
      fillOpacity: 0.2,
      lineWidth: 100,
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
  graph.setItemState(node, 'detailed', false);
  graph.zoomTo(1);
});


// Listen to the mouse click event on node
graph.on('node:click', (evt) => {
  const node = evt.item;
  // inactivate the hover state of the node
  graph.setItemState(node, 'hover', false);
  graph.setItemState(node, 'detailed', true);

  graph.updateItem(node, {
    label: "Updated",
    style: {
      // for keyShape's fill, stroke, and opacity
     // opacity: 0.5,
     // y: 0,
      size: [500],
      // the styles for the sub shape named 'node-text'
      'node-text': {
        stroke: 'yellow',
      },
    },
  });
  console.log(evt.x+". "+evt.y);
  /*
  graph.updateLayout({
    center: [evt.x, evt.y],
  });
   graph.layout();
  graph.zoomTo(2);
  
  */
});

// Register the custom Behavior of adding a node by clicking
G6.registerBehavior('click-add-node', {
  // Bind the events and response functions for this custom Behavior
  getEvents() {
    return {
      'canvas:click': 'onClick', // The event to be listned is canvas:click. The response function is onClick
    };
  },
  // The click event
  onClick(ev) {
    const graph = this.graph;
    const newNodeID = G6.Util.uniqueId(); // Generate a unique id
    // Add a new node on the canvas
    //console.log("id:"+newNodeID);
    const node = graph.addItem('node', {
      x: ev.x,
      y: ev.y,
      id: newNodeID, 
    });

    const edge = graph.addItem('edge', {
      source: newNodeID,
      target: "node3",
    });
  },
});
