import React, { useState, useEffect } from "react";
import { fabric } from "fabric";

const UP_ARROW = (
  <svg width="16" height="16" viewBox="0 0 12 12" className="mt-1 mr-1">
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 7.5l-3-3-3 3"
    ></path>
  </svg>
);
function renderIcon(icon) {
  return function renderIcon(ctx, left, top, styleOverride, fabricObject) {
    var size = this.cornerSize;
    ctx.save();
    ctx.translate(left, top);
    ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
    ctx.drawImage(icon, -size / 2, -size / 2, size, size);
    ctx.restore();
  };
}

function App() {
  const [canvas, setCanvas] = useState("");
  useEffect(() => {
    //Set canvas dimensions:
    let canvas_width;
    let canvas_height;
    //Portrait
    if (window.innerWidth > window.innerHeight) {
      canvas_width = (window.innerHeight * 70) / 100;
      canvas_height = (window.innerHeight * 70) / 100;
      console.log("canvas_width::", canvas_width);
      console.log("canvas_height::", canvas_height);
    }
    //Landscape
    else {
      canvas_width = (window.innerWidth * 90) / 100;
      canvas_height = (window.innerWidth * 90) / 100;
      alert(
        "Landscape canvas_width:: " +
          canvas_width +
          ", canvas_height:: " +
          canvas_height
      );
    }

    setCanvas(initCanvas(canvas_height, canvas_width));

    var deleteIcon =
      "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Ebene_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='595.275px' height='595.275px' viewBox='200 215 230 470' xml:space='preserve'%3E%3Ccircle style='fill:%23F44336;' cx='299.76' cy='439.067' r='218.516'/%3E%3Cg%3E%3Crect x='267.162' y='307.978' transform='matrix(0.7071 -0.7071 0.7071 0.7071 -222.6202 340.6915)' style='fill:white;' width='65.545' height='262.18'/%3E%3Crect x='266.988' y='308.153' transform='matrix(0.7071 0.7071 -0.7071 0.7071 398.3889 -83.3116)' style='fill:white;' width='65.544' height='262.179'/%3E%3C/g%3E%3C/svg%3E";

    var deleteImg = document.createElement("img");
    deleteImg.src = deleteIcon;

    fabric.Object.prototype.controls.deleteControl = new fabric.Control({
      x: 0.5,
      y: -0.5,
      offsetY: -16,
      offsetX: 16,
      cursorStyle: "pointer",
      mouseUpHandler: deleteObject,
      render: renderIcon(deleteImg),
      cornerSize: 24
    });
  }, []);

  const deleteObject = (eventData, target) => {
    var canvas = target.target.canvas;
    canvas.remove(target.target);
    canvas.requestRenderAll();
  };

  const addShape = (name) => {
    switch (name) {
      case "circle":
        canvas.add(
          new fabric.Circle({ radius: 30, fill: "#f55", top: 100, left: 100 })
        );
        break;

      case "square":
        canvas.add(
          new fabric.Rect({
            left: 50,
            top: 50,
            fill: "#f55",
            width: 40,
            height: 40
          })
        );

        break;

      default:
        break;
    }
  };

  const addText = (text) => {
    canvas.add(new fabric.Textbox(text));
    // canvas.add(new fabric.Text(text));
  };

  const uploadFile = (event) => {
    fabric.Image.fromURL(
      URL.createObjectURL(event.target.files[0]),
      (imageObject) => {
        canvas.add(imageObject);
      }
    );
  };

  const downloadCard = () => {
    const jpgOutput = canvas.toDataURL("image/jpg"); //jpg
    let fakeElement = document.createElement("a");
    fakeElement.download = "image.jpg";
    fakeElement.style.opacity = "0";
    document.getElementById("fake_download").append(fakeElement);
    fakeElement.href = jpgOutput;
    fakeElement.click();
    fakeElement.remove();
  };

  const initCanvas = (canvas_height, canvas_width) => {
    return new fabric.Canvas("canvas", {
      height: canvas_height,
      width: canvas_width
    });
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="px-1 md:px-6 py-6 sm:px-16 items-center">
          <canvas
            id="canvas"
            className="border-4 border-dashed border-gray-200 rounded-lg box-border h-80 w-80 md:h-96 md:w-96 "
          ></canvas>
          {/* <div className="border-4 border-dashed border-gray-200 rounded-lg box-border h-80 w-80 md:h-96 md:w-96 "></div> */}
        </div>
      </div>
      {/* Toolbar start */}
      <div className="fixed bottom-0 grid grid-flow-row">
        <div className="flex items-center bg-gray-900 text-white p-4">
          <div className="grid grid-flow-col auto-cols-max">
            <input
              id="image_file"
              type="file"
              accept="image/*"
              onChange={(event) => {
                uploadFile(event);
              }}
              className="hidden"
            />
            <p id="fake_download"></p>
            <button
              className="grid grid-flow-col"
              title="Add Image"
              onClick={() => {
                document.getElementById("image_file").click();
              }}
            >
              <svg
                viewBox="0 0 24 24"
                width="24"
                height="24"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-2 mr-2"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <circle cx="8.5" cy="8.5" r="1.5"></circle>
                <polyline points="21 15 16 10 5 21"></polyline>
              </svg>
            </button>
            <button
              className="grid grid-flow-col"
              title="Add Text"
              onClick={() => {
                addText("Hello World");
              }}
            >
              <svg
                viewBox="0 0 24 24"
                width="24"
                height="24"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-2 mr-2"
              >
                <polyline points="4 7 4 4 20 4 20 7"></polyline>
                <line x1="9" y1="20" x2="15" y2="20"></line>
                <line x1="12" y1="4" x2="12" y2="20"></line>
              </svg>
            </button>
            <button
              className="grid grid-flow-col"
              title="Add Rectangle"
              onClick={() => {
                addShape("square");
              }}
            >
              <svg
                viewBox="0 0 24 24"
                width="24"
                height="24"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-2 mr-2"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              </svg>
            </button>
            <button
              className="grid grid-flow-col"
              title="Add Circle"
              onClick={() => {
                addShape("circle");
              }}
            >
              <svg
                viewBox="0 0 24 24"
                width="24"
                height="24"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-2 mr-2"
              >
                <circle cx="12" cy="12" r="10"></circle>
              </svg>
            </button>
            <button
              title="Download"
              onClick={() => {
                downloadCard();
              }}
            >
              <svg
                viewBox="0 0 24 24"
                width="24"
                height="24"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-2 mr-2"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* Toolbar end */}
    </div>
  );
}

export default App;
