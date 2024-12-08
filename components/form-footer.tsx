import { Check, FilePenLine } from "lucide-react";

export default function FormFooter({ disableSave }: { disableSave: boolean }) {
  return (
    <div className="flex items-center justify-between gap-4 border-t border-gray-200 px-4 py-3 bg-[#F6F8FAE5]/90">
      <div>
        <button className=" font-semibold  text-black px-[14px] py-[6px] rounded-xl flex text-sm items-center gap-1 border border-gray-200 bg-white ">
          <FilePenLine size={16} />
          Save as Draft
        </button>
      </div>
      <button
        disabled={disableSave}
        onClick={() => {}}
        className="flex items-center gap-1 rounded-xl border disabled:border-gray-200 px-[14px] py-[6px] text-sm font-semibold border-[#1E874B] bg-[#00AA45] disabled:bg-gray-100 text-white disabled:text-gray-400"
      >
        <Check size={16} />
        <span>Publish form</span>
      </button>
    </div>
  );
}
