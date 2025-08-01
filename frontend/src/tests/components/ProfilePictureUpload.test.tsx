import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@/tests/test-utils";
import ProfilePictureUpload from "@/components/ProfilePictureUpload";

const createFile = (name: string, type: string) => {
  return new File(["test"], name, { type });
};

describe("ProfilePictureUpload Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render upload button", () => {
    render(<ProfilePictureUpload />);
    expect(
      screen.getByRole("button", { name: /add photo/i })
    ).toBeInTheDocument();
  });

  it("should handle valid image upload", () => {
    const onUpload = vi.fn();
    render(<ProfilePictureUpload onUpload={onUpload} />);

    const file = createFile("test.jpg", "image/jpeg");
    const input = screen.getByTestId("file-input");

    fireEvent.change(input, { target: { files: [file] } });

    expect(onUpload).toHaveBeenCalledWith(file);
  });

  it("should show error for invalid file type", () => {
    const onError = vi.fn();
    render(<ProfilePictureUpload onError={onError} />);

    const file = createFile("test.txt", "text/plain");
    const input = screen.getByTestId("file-input");

    fireEvent.change(input, { target: { files: [file] } });

    expect(onError).toHaveBeenCalledWith("Please select an image file");
  });

  it("should show error for large file size", () => {
    const onError = vi.fn();
    render(<ProfilePictureUpload onError={onError} maxSize={1} />);

    const largeFile = new File(["x".repeat(1024 * 1024 * 2)], "large.jpg", {
      type: "image/jpeg",
    });
    const input = screen.getByTestId("file-input");

    fireEvent.change(input, { target: { files: [largeFile] } });

    expect(onError).toHaveBeenCalledWith("File size must be less than 1MB");
  });

  it("should show loading state during upload", () => {
    render(<ProfilePictureUpload isUploading={true} />);
    expect(screen.getByText(/uploading/i)).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("should show preview of selected image", () => {
    const file = createFile("test.jpg", "image/jpeg");
    const fakeUrl = "blob:test-url";
    vi.spyOn(URL, "createObjectURL").mockReturnValue(fakeUrl);

    render(<ProfilePictureUpload />);
    const input = screen.getByTestId("file-input");
    fireEvent.change(input, { target: { files: [file] } });

    const preview = screen.getByRole("img");
    expect(preview).toHaveAttribute("src", fakeUrl);

    URL.createObjectURL.mockRestore();
  });
});
