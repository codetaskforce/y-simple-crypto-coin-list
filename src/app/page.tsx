import CoinTracker from "./components/simplecoinlist";

export default function Home() {
  return (
    <>
      <CoinTracker />

      <div className="flex flex-wrap mx-3 mb-5">
        <div className="w-full max-w-full sm:w-3/4 mx-auto text-center">
          <p className="text-sm text-slate-500 py-1">A Simple Crypto Coin List by <a href="https://www.taskorce.wiki" className="text-slate-700 hover:text-slate-900" target="_blank">TaskForce</a>. </p>
        </div>
      </div>
    </>
  );
}
