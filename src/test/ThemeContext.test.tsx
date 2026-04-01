import { describe, it, expect, beforeEach } from "vite-plus/test";
import { renderHook, act } from "@testing-library/react";
import { ThemeProvider, ThemeContext } from "../context/ThemeContext";
import { useContext } from "react";

beforeEach(() => {
  localStorage.clear();
});

describe("ThemeContext", () => {
  it("defaults to light theme", () => {
    const { result } = renderHook(() => useContext(ThemeContext), {
      wrapper: ({ children }) => <ThemeProvider>{children}</ThemeProvider>,
    });
    expect(result.current.theme).toBe("light");
  });

  it("toggles theme from light to dark", () => {
    const { result } = renderHook(() => useContext(ThemeContext), {
      wrapper: ({ children }) => <ThemeProvider>{children}</ThemeProvider>,
    });
    act(() => {
      result.current.toggleTheme();
    });
    expect(result.current.theme).toBe("dark");
  });

  it("toggles theme from dark back to light", () => {
    const { result } = renderHook(() => useContext(ThemeContext), {
      wrapper: ({ children }) => <ThemeProvider>{children}</ThemeProvider>,
    });
    act(() => {
      result.current.toggleTheme();
    });
    act(() => {
      result.current.toggleTheme();
    });
    expect(result.current.theme).toBe("light");
  });
});
