import React, { useRef, useEffect } from 'react';

const BoundingBoxCanvas = ({ imageUrl, boxes, labelColors, sliderConfidence, overlapThreshold }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const image = new Image();

    const calculateIoU = (boxA, boxB) => {
      const xA = Math.max(boxA.x_min, boxB.x_min);
      const yA = Math.max(boxA.y_min, boxB.y_min);
      const xB = Math.min(boxA.x_max, boxB.x_max);
      const yB = Math.min(boxA.y_max, boxB.y_max);

      const intersectionArea = Math.max(0, xB - xA) * Math.max(0, yB - yA);
      const boxAArea = (boxA.x_max - boxA.x_min) * (boxA.y_max - boxA.y_min);
      const boxBArea = (boxB.x_max - boxB.x_min) * (boxB.y_max - boxB.y_min);

      return intersectionArea / (boxAArea + boxBArea - intersectionArea);
    };

    const filterBoxes = (boxes) => {
      const normalizedThreshold = overlapThreshold / 100; // Convert to decimal
      const filtered = [];

      boxes.forEach((box, index) => {
        let keep = true;

        for (let otherIndex = 0; otherIndex < boxes.length; otherIndex++) {
          if (index === otherIndex) continue;

          const otherBox = boxes[otherIndex];
          const iou = calculateIoU(box, otherBox);

          // Allow minimal overlap when threshold is 0%
          if (overlapThreshold === 0 && iou > 0) {
            keep = false;
            break;
          }

          // Normal threshold logic
          if (iou >= normalizedThreshold) {
            if (box.confidence < otherBox.confidence) {
              keep = false;
              break;
            }
          }
        }

        if (keep && box.confidence + 0.01 >= Number((sliderConfidence / 100).toFixed(2))) {
          filtered.push(box);
        }
      });

      return filtered;
    };

    image.onload = () => {
      canvas.width = 640;
      canvas.height = 640;
      context.drawImage(image, 0, 0, 640, 640);

      const filteredBoxes = filterBoxes(boxes);

      filteredBoxes.forEach(box => {
        const { x_min, y_min, x_max, y_max, class_name, confidence } = box;
        const width = x_max - x_min;
        const height = y_max - y_min;

        if (labelColors[class_name]) {
          context.fillStyle = labelColors[class_name];
          context.strokeStyle = labelColors[class_name];
        }

        // Fill the bounding box area with a semi-transparent color
        context.globalAlpha = 0.2;
        context.fillRect(x_min, y_min, width, height);
        context.globalAlpha = 1.0;

        context.lineWidth = 1;
        context.strokeRect(x_min, y_min, width, height);

        const label = `${class_name} ${Math.round(confidence * 100)}%`;
        context.font = '200 12px Inter, sans-serif'; // Use Inter font with weight 200
        context.textAlign = 'left'; // Align text to the left
        context.textBaseline = 'top'; // Align text to the top

        const textWidth = context.measureText(label).width;
        const textHeight = 15; // Approximate text height
        const padding = 4; // Padding around the text

        // Calculate background position with boundary checks
        let backgroundX = x_min;
        let backgroundY = y_min - textHeight - padding * 2;

        // Adjust if the background rectangle goes beyond the canvas
        if (backgroundX + textWidth + padding * 2 > canvas.width) {
          backgroundX = canvas.width - textWidth - padding * 2;
        }
        if (backgroundY < 0) {
          backgroundY = y_min + padding * 2; // Place below the bounding box
        }

        context.fillStyle = labelColors[class_name];
        context.fillRect(backgroundX, backgroundY, textWidth + padding * 2, textHeight + padding * 2);

        // Draw text
        context.fillStyle = 'black';
        context.fillText(label, backgroundX + padding, backgroundY + padding);
      });
    };

    image.src = imageUrl;
  }, [imageUrl, boxes, labelColors, sliderConfidence, overlapThreshold]);

  return <canvas ref={canvasRef} />;
};

export default BoundingBoxCanvas;
