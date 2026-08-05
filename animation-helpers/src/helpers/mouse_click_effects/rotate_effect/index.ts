interface MakeRotateEffectProps {
  x: number;
  y: number;
  dotColor?: string;
}

interface CreateTouchEffectProps {
  x: any;
  y: any;
  degree: number;
  dotColor?: string;
}

interface CreateDotContainerProps {
  x: number;
  y: number;
  size: number;
  degree: number;
}
interface CreateDotWrapperProps {
  size: number;
  parent: HTMLDivElement;
}

interface CreateDotProps {
  dotColor?: string;
  parent: HTMLDivElement;
}

/**
 * Create dot container element.
 */
function createDotContainer({ x, y, degree, size }: CreateDotContainerProps) {
  const container = document.createElement("div");
  container.classList.add("dot-container");
  container.style.left = `${x - size / 2}px`;
  container.style.top = `${y - size / 2}px`;
  container.style.width = `${size}px`;
  container.style.height = `${size}px`;
  container.style.transform = `rotate(${degree}deg)`;
  container.style.position = `absolute`;
  container.style.zIndex = "666";
  container.style.pointerEvents = "none";
  return container;
}

/**
 * Create dot wrapper element.
 */
function createDotWrapper({ size, parent }: CreateDotWrapperProps) {
  const wrapper = document.createElement("div");
  wrapper.style.width = `${size}px`;
  wrapper.style.height = `${size}px`;
  wrapper.style.display = "flex";
  wrapper.style.justifyContent = "center";
  wrapper.style.alignItems = "center";
  wrapper.style.pointerEvents = "none";
  wrapper.classList.add("animate-rotate-r");
  parent.appendChild(wrapper);
  return wrapper;
}

/**
 * Create dot element.
 */
function createDot({ parent, dotColor = "red" }: CreateDotProps) {
  const dot = document.createElement("div");
  dot.style.width = "3px";
  dot.style.height = "3px";
  dot.style.backgroundColor = dotColor;
  dot.style.transitionProperty =
    "color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter";
  dot.style.transitionTimingFunction = "cubic-bezier(0.4, 0, 0.2, 1)";
  dot.style.transitionDuration = "150ms";
  dot.style.pointerEvents = "none";
  dot.classList.add("animate-straight-r");
  parent.appendChild(dot);
  return dot;
}

/**
 * Create single touch effect.
 */
function createTouchEffect({ x, y, degree, dotColor }: CreateTouchEffectProps) {
  const containerSize = 80;

  // Create dot container.
  const dotContainer = createDotContainer({
    x,
    y,
    degree,
    size: containerSize,
  });

  // Create dot wrapper.
  const dotWrapper = createDotWrapper({
    size: containerSize,
    parent: dotContainer,
  });

  // Create dot.
  createDot({ parent: dotWrapper, dotColor });

  // Append dot container into body.
  document.body.appendChild(dotContainer);

  // Remove dot.
  setTimeout(() => dotContainer.remove(), 200);
}

/**
 * Make touch animation effect.
 */
export function makeRotateEffect({ x, y, dotColor }: MakeRotateEffectProps) {
  const degreeList = [90, 180, 270, 360];
  degreeList.forEach((degree) => {
    createTouchEffect({ x, y, degree, dotColor });
  });
}
