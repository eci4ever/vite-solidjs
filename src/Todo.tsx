import Layout from "./Layout";
import { createSignal, createEffect, Component, For } from "solid-js";

interface Todo {
  id: number;
  title: string;
  desc: string;
}

function Todo() {
  const [open, setOpen] = createSignal(false);

  const [todos, setTodos] = createSignal<Todo[]>([]);
  const [loading, setLoading] = createSignal(false);
  const [error, setError] = createSignal("");

  // Form states
  const [showForm, setShowForm] = createSignal(false);
  const [editingTodo, setEditingTodo] = createSignal<Todo | null>(null);
  const [formData, setFormData] = createSignal({ title: "", desc: "" });
  const [formLoading, setFormLoading] = createSignal(false);

  // Fetch todos from API
  const fetchTodos = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/posts");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setTodos(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch todos");
      console.error("Error fetching todos:", err);
    } finally {
      setLoading(false);
    }
  };

  // Create todo
  const createTodo = async () => {
    setFormLoading(true);
    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData()),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      await fetchTodos(); // Refresh the list
      resetForm();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create todo");
      console.error("Error creating todo:", err);
    } finally {
      setFormLoading(false);
    }
  };

  // Update todo
  const updateTodo = async () => {
    if (!editingTodo()) return;

    setFormLoading(true);
    try {
      const response = await fetch(`/api/posts/${editingTodo()!.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData()),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      await fetchTodos(); // Refresh the list
      resetForm();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update todo");
      console.error("Error updating todo:", err);
    } finally {
      setFormLoading(false);
    }
  };

  // Delete todo
  const deleteTodo = async (id: number) => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      await fetchTodos(); // Refresh the list
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete todo");
      console.error("Error deleting todo:", err);
    }
  };

  // Form helpers
  const resetForm = () => {
    setFormData({ title: "", desc: "" });
    setEditingTodo(null);
    setShowForm(false);
  };

  const startEdit = (todo: Todo) => {
    setEditingTodo(todo);
    setFormData({ title: todo.title, desc: todo.desc });
    setShowForm(true);
  };

  const handleSubmit = () => {
    if (editingTodo()) {
      updateTodo();
    } else {
      createTodo();
    }
  };

  // Fetch todos on component mount
  createEffect(() => {
    fetchTodos();
  });

  return (
    <>
      <Layout
        showSidebar={true}
        sidebarOpen={open()}
        onToggleSidebar={() => setOpen(!open())}
      >
        <div class="p-6">
          <div class="mt-6">
            <h2 class="text-2xl font-bold text-gray-900">Blog Post List</h2>

            {/* Loading state */}
            {loading() && (
              <div class="mt-4 text-center">
                <div class="text-gray-600">Loading posts...</div>
              </div>
            )}

            {/* Error state */}
            {error() && (
              <div class="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                <p>Error: {error()}</p>
                <button
                  onClick={fetchTodos}
                  class="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Retry
                </button>
              </div>
            )}

            {/* Todo list */}
            {!loading() && !error() && (
              <div class="mt-4">
                <div class="mb-4 flex gap-2">
                  <button
                    onClick={fetchTodos}
                    class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Refresh Posts
                  </button>
                  <button
                    onClick={() => setShowForm(true)}
                    class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Add New Post
                  </button>
                </div>

                {/* Create/Edit Form */}
                {showForm() && (
                  <div class="mb-6 p-4 border border-gray-300 rounded-md bg-gray-50">
                    <h3 class="text-lg font-semibold mb-4">
                      {editingTodo() ? "Edit Post" : "Create New Post"}
                    </h3>
                    <div class="space-y-4">
                      <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">
                          Title
                        </label>
                        <input
                          type="text"
                          value={formData().title}
                          onInput={(e) =>
                            setFormData({
                              ...formData(),
                              title: e.target.value,
                            })
                          }
                          class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter post title"
                        />
                      </div>
                      <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">
                          Description
                        </label>
                        <textarea
                          value={formData().desc}
                          onInput={(e) =>
                            setFormData({ ...formData(), desc: e.target.value })
                          }
                          class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          rows="3"
                          placeholder="Enter post description"
                        />
                      </div>
                      <div class="flex gap-2">
                        <button
                          onClick={handleSubmit}
                          disabled={formLoading() || !formData().title.trim()}
                          class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                          {formLoading()
                            ? "Saving..."
                            : editingTodo()
                            ? "Update Post"
                            : "Create Post"}
                        </button>
                        <button
                          onClick={resetForm}
                          class="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {todos().length === 0 ? (
                  <div class="text-gray-600">No posts found</div>
                ) : (
                  <div class="space-y-4">
                    <For each={todos()}>
                      {(todo) => (
                        <div class="p-4 border border-gray-300 rounded-md bg-white">
                          <div class="flex justify-between items-start">
                            <div class="flex-1">
                              <h3 class="text-lg font-semibold text-gray-900">
                                {todo.title}
                              </h3>
                              <p class="text-gray-600 mt-2">{todo.desc}</p>
                              <div class="mt-2 text-sm text-gray-500">
                                ID: {todo.id}
                              </div>
                            </div>
                            <div class="flex gap-2 ml-4">
                              <button
                                onClick={() => startEdit(todo)}
                                class="px-3 py-1 bg-yellow-600 text-white text-sm rounded hover:bg-yellow-700"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => deleteTodo(todo.id)}
                                class="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </For>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </Layout>
    </>
  );
}

export default Todo;
