import './index.scss'

export default function Input({ hook: { onFocus, onBlur }, options: { ...config } }) {
  return (
    <input
      {...config}
      // ref={(e) => {
      //   ref(e);
      //   fieldRef.current = e;
      // }}
      onFocus={onFocus}
      onBlur={onBlur}
      className="block w-full py-3 text-base placeholder:text-gray-300 outline-none bg-transparent"
    />
  );
}
