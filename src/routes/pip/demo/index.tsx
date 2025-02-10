import { $, component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { useDocumentPictureInPicture } from "./testTry";

export default component$(() => {
  const openPipSig = useSignal<HTMLButtonElement | undefined>();
  const pipContentSig = useSignal<HTMLParagraphElement | undefined>();
  const countSig = useSignal(0);
  const countUpBTN = useSignal<HTMLButtonElement | undefined>();
  const countDwnBTN = useSignal<HTMLButtonElement | undefined>();

  const { DPIPcomponent, setLeaveEvents, setEnterEvents } =
    useDocumentPictureInPicture();

  setLeaveEvents(
    $(() => {
      console.log("fine bro lm leaving  ----");
    })
  );
  setEnterEvents(
    $(() => {
      console.log("Hi there lm entering now !!!!");
    })
  );

  const countUp = $(() => {
    countSig.value = countSig.value + 1;
  });

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(async () => {
    countUpBTN.value?.addEventListener("click", async () => {
      await countUp();
    });
    console.log("inside browser console");
  });

  return (
    <>
      <h1>Pip mother of all demos</h1>

      <h3>Ok lets rock</h3>

      <div id="pipContentContainer">
        <section ref={pipContentSig}>
          stufff that goes inside the PIP {countSig.value}
          {/* <button ref={countUpBTN}>count up</button> */}
          <button ref={countDwnBTN}>count down</button>
        </section>
      </div>
      <button ref={openPipSig}>On picture in picture</button>
      <DPIPcomponent
        pipTrigger={openPipSig}
        // pipContent={pipContentSig}
        // pipContainer="#pipContentContainer"
      >
        <div> Ok lets see if this works</div>
        <button ref={countUpBTN}>count up</button>
      </DPIPcomponent>

      {/* <myJSX /> */}
    </>
  );
});

export const head: DocumentHead = {
  title: "PIP Demo",
};
