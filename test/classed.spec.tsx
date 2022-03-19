/* eslint-disable react/react-in-jsx-scope */
import clsx from "clsx";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FunctionalComponent, h } from "preact";
import classed, { tw } from "../dist";
import { render } from "@testing-library/preact";

interface ImageProps {
  src: string;
  alt?: string;
  className?: string;
}

const Image: FunctionalComponent<ImageProps> = ({ src, alt, className }) => {
  return (
    <img
      src={src}
      alt={alt}
      className={clsx([
        "flex justify-center align-center rounded shadow-md",
        className,
      ])}
    />
  );
};

const Wrapper = classed.div("h-full flex flex-col");
const Title = classed.div`text-gray-500 text-center text-xs py-2 border-b`;
const CarList = classed.div`flex flex-col flex-1 overflow-scroll`;
const CarItem = classed.div<{ selected?: boolean }>(({ selected }) =>
  clsx([
    tw`border-2 flex p-3 m-2 items-center`,
    selected ? tw`border-black` : tw`border-white`,
  ])
);
const CarImage = classed<ImageProps>(Image)`h-14`;
const CarCaption = classed.span`text-gray-500 text-xs py-2 text-center`;

const App: FunctionalComponent = () => (
  <Wrapper>
    <Title>Choose a ride, or swipe up for more</Title>
    <CarList>
      <CarItem selected={true}>
        <CarImage src="https://via.placeholder.com/100" />
        <CarCaption>Car 1</CarCaption>
      </CarItem>
      <CarItem>
        <CarImage src="https://via.placeholder.com/100" />
        <CarCaption>Car 2</CarCaption>
      </CarItem>
    </CarList>
  </Wrapper>
);

describe("classed", () => {
  it("should match with snapshot when used classed-components", () => {
    const { container } = render(<App />);
    expect(container.innerHTML).toMatchSnapshot();
  });
});
