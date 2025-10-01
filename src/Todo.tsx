import Layout from "./Layout";
import { createSignal, createEffect, Component } from "solid-js";
function Todo() {
  const [open, setOpen] = createSignal(false);
  return (
    <>
      <Layout
        showSidebar={true}
        sidebarOpen={open()}
        onToggleSidebar={() => setOpen(!open())}
      >
        <div class="p-6">
          <div class="mt-6">
            <h2 class="text-2xl font-bold text-gray-900">Todo List</h2>
            <div class="mt-4">
              <input
                type="text"
                class="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default Todo;
