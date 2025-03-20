import tkinter as tk
from tkinter import colorchooser, simpledialog, messagebox, ttk
from PIL import Image, ImageDraw, ImageTk, ImageFont
import numpy as np
import io
import os
import requests
os.environ["IMAGE_GEN_API_KEY"] = "sk-piXnT4vKFP1cSAHR3GxuNLirvgF97r0agK1vzve7KyE8ajSX"
from dotenv import load_dotenv
import base64
import json

class TShirtDesignApp:
    def __init__(self, root):
        load_dotenv()  # Load environment variables from .env file
        
        self.root = root
        self.root.title("T-Shirt Design App")
        self.root.geometry("1200x800")
        
        # Drawing parameters
        self.current_color = "black"
        self.brush_size = 5
        self.drawing = False
        self.last_x = 0
        self.last_y = 0
        
        # User's design components
        self.user_drawing = None
        self.user_text = ""
        self.user_text_color = "black"
        self.tshirt_color = "#FFFFFF"  # Default white T-shirt
        
        # Positioning variables
        self.drawing_position = (90, 170)  # Default position (x, y)
        self.text_position = (190, 380)    # Default position (x, y)
        
        # Size variables
        self.drawing_size = 200  # Default size in pixels
        self.text_size = 20      # Default font size
        
        # Dragging state
        self.dragging_drawing = False
        self.dragging_text = False
        self.resizing_drawing = False
        self.drag_start_x = 0
        self.drag_start_y = 0
        
        self._create_widgets()
    
    def _create_widgets(self):
        # Left panel - Drawing tools
        left_panel = tk.Frame(self.root, width=300, bg="#f0f0f0", padx=10, pady=10)
        left_panel.pack(side=tk.LEFT, fill=tk.Y)
        left_panel.pack_propagate(False)
        
        # Color selection
        tk.Label(left_panel, text="Drawing Tools", font=("Arial", 14, "bold"), bg="#f0f0f0").pack(pady=10)
        
        # Drawing color
        color_frame = tk.Frame(left_panel, bg="#f0f0f0")
        color_frame.pack(fill=tk.X, pady=5)
        tk.Label(color_frame, text="Drawing Color:", bg="#f0f0f0").pack(side=tk.LEFT)
        self.color_btn = tk.Button(color_frame, bg=self.current_color, width=6, command=self._choose_drawing_color)
        self.color_btn.pack(side=tk.RIGHT)
        
        # Brush size
        size_frame = tk.Frame(left_panel, bg="#f0f0f0")
        size_frame.pack(fill=tk.X, pady=5)
        tk.Label(size_frame, text="Brush Size:", bg="#f0f0f0").pack(side=tk.LEFT)
        self.size_slider = tk.Scale(size_frame, from_=1, to=20, orient=tk.HORIZONTAL, command=self._update_brush_size)
        self.size_slider.set(self.brush_size)
        self.size_slider.pack(side=tk.RIGHT, fill=tk.X, expand=True)
        
        # Clear drawing
        tk.Button(left_panel, text="Clear Drawing", command=self._clear_canvas).pack(fill=tk.X, pady=5)
        
        # T-shirt color
        tk.Label(left_panel, text="T-Shirt Options", font=("Arial", 14, "bold"), bg="#f0f0f0").pack(pady=(20, 10))
        
        tshirt_color_frame = tk.Frame(left_panel, bg="#f0f0f0")
        tshirt_color_frame.pack(fill=tk.X, pady=5)
        tk.Label(tshirt_color_frame, text="T-Shirt Color:", bg="#f0f0f0").pack(side=tk.LEFT)
        self.tshirt_color_btn = tk.Button(tshirt_color_frame, bg=self.tshirt_color, width=6, command=self._choose_tshirt_color)
        self.tshirt_color_btn.pack(side=tk.RIGHT)
        
        # Text entry
        text_frame = tk.Frame(left_panel, bg="#f0f0f0")
        text_frame.pack(fill=tk.X, pady=5)
        tk.Label(text_frame, text="Text:", bg="#f0f0f0").pack(anchor=tk.W)
        self.text_entry = tk.Entry(text_frame)
        self.text_entry.pack(fill=tk.X, pady=2)
        
        # Text color
        text_color_frame = tk.Frame(left_panel, bg="#f0f0f0")
        text_color_frame.pack(fill=tk.X, pady=5)
        tk.Label(text_color_frame, text="Text Color:", bg="#f0f0f0").pack(side=tk.LEFT)
        self.text_color_btn = tk.Button(text_color_frame, bg=self.user_text_color, width=6, command=self._choose_text_color)
        self.text_color_btn.pack(side=tk.RIGHT)
        
        # Text size
        text_size_frame = tk.Frame(left_panel, bg="#f0f0f0")
        text_size_frame.pack(fill=tk.X, pady=5)
        tk.Label(text_size_frame, text="Text Size:", bg="#f0f0f0").pack(side=tk.LEFT)
        self.text_size_slider = tk.Scale(text_size_frame, from_=10, to=40, orient=tk.HORIZONTAL, 
                                         command=self._update_text_size)
        self.text_size_slider.set(self.text_size)
        self.text_size_slider.pack(side=tk.RIGHT, fill=tk.X, expand=True)
        
        # Drawing size
        drawing_size_frame = tk.Frame(left_panel, bg="#f0f0f0")
        drawing_size_frame.pack(fill=tk.X, pady=5)
        tk.Label(drawing_size_frame, text="Drawing Size:", bg="#f0f0f0").pack(side=tk.LEFT)
        self.drawing_size_slider = tk.Scale(drawing_size_frame, from_=50, to=300, orient=tk.HORIZONTAL, 
                                            command=self._update_drawing_size)
        self.drawing_size_slider.set(self.drawing_size)
        self.drawing_size_slider.pack(side=tk.RIGHT, fill=tk.X, expand=True)
        
        # Apply text button
        tk.Button(left_panel, text="Apply Text", command=self._apply_text).pack(fill=tk.X, pady=5)
        
        # Positioning instructions
        instruction_frame = tk.Frame(left_panel, bg="#f0f0f0")
        instruction_frame.pack(fill=tk.X, pady=10)
        
        instruction_text = tk.Label(
            instruction_frame, 
            text="• Drag elements to reposition\n• Use sliders to resize\n• Click and drag corners to resize drawing", 
            bg="#f0f0f0", 
            justify=tk.LEFT 
        )
        instruction_text.pack(fill=tk.X)
        
        # Generate design button
        tk.Button(left_panel, text="Generate T-Shirt Design", font=("Arial", 12, "bold"), 
                 bg="#4CAF50", fg="white", height=2, command=self._generate_tshirt).pack(fill=tk.X, pady=20)
        
        # Center panel - Drawing canvas
        center_panel = tk.Frame(self.root)
        center_panel.pack(side=tk.LEFT, fill=tk.BOTH, expand=True, padx=10, pady=10)
        
        # Canvas for drawing
        self.canvas = tk.Canvas(center_panel, bg="white", width=500, height=500, bd=2, relief=tk.SUNKEN)
        self.canvas.pack(fill=tk.BOTH, expand=True)
        
        # Create a drawing surface
        self.drawing_image = Image.new("RGBA", (500, 500), (255, 255, 255, 0))
        self.drawing_draw = ImageDraw.Draw(self.drawing_image)
        
        # Bind mouse events for drawing
        self.canvas.bind("<Button-1>", self._start_draw)
        self.canvas.bind("<B1-Motion>", self._draw)
        self.canvas.bind("<ButtonRelease-1>", self._stop_draw)
        
        # Right panel - Preview
        right_panel = tk.Frame(self.root, width=400, bg="#f0f0f0")
        right_panel.pack(side=tk.RIGHT, fill=tk.BOTH, expand=True, padx=10, pady=10)
        
        tk.Label(right_panel, text="T-Shirt Preview", font=("Arial", 14, "bold"), bg="#f0f0f0").pack(pady=10)
        
        # Canvas for T-shirt preview
        self.preview_canvas = tk.Canvas(right_panel, bg="#f0f0f0", width=380, height=600)
        self.preview_canvas.pack(fill=tk.BOTH, expand=True)
        
        # Bind mouse events for repositioning
        self.preview_canvas.bind("<Button-1>", self._start_drag)
        self.preview_canvas.bind("<B1-Motion>", self._drag)
        self.preview_canvas.bind("<ButtonRelease-1>", self._stop_drag)
        
        # Create initial T-shirt preview
        self._update_preview()
    
    def _start_draw(self, event):
        self.drawing = True
        self.last_x = event.x
        self.last_y = event.y
    
    def _draw(self, event):
        if self.drawing:
            x, y = event.x, event.y
            # Draw on canvas
            self.canvas.create_line(self.last_x, self.last_y, x, y, 
                                   width=self.brush_size, fill=self.current_color,
                                   capstyle=tk.ROUND, smooth=tk.TRUE)
            
            # Draw on image
            self.drawing_draw.line([self.last_x, self.last_y, x, y], 
                                  fill=self.current_color, width=self.brush_size)
            
            self.last_x = x
            self.last_y = y
    
    def _stop_draw(self, event):
        self.drawing = False
        self._update_preview()
    
    def _start_drag(self, event):
        x, y = event.x, event.y
        
        # Check if click is on a resize handle for drawing
        drawing_x, drawing_y = self.drawing_position
        drawing_width, drawing_height = self.drawing_size, self.drawing_size
        
        # Bottom-right resize handle for drawing
        handle_size = 10
        if (drawing_x + drawing_width - handle_size <= x <= drawing_x + drawing_width + handle_size and 
            drawing_y + drawing_height - handle_size <= y <= drawing_y + drawing_height + handle_size):
            self.resizing_drawing = True
            self.drag_start_x = x
            self.drag_start_y = y
            self.original_drawing_size = self.drawing_size
            return
        
        # Check if click is within drawing area
        if (drawing_x <= x <= drawing_x + drawing_width and 
            drawing_y <= y <= drawing_y + drawing_height):
            self.dragging_drawing = True
            self.drag_start_x = x - drawing_x
            self.drag_start_y = y - drawing_y
            return
        
        # Check if click is near text
        text_x, text_y = self.text_position
        # Approximate text area based on text size and length
        text_width = len(self.user_text) * (self.text_size / 2)
        text_height = self.text_size + 10
        
        if (text_x - text_width/2 <= x <= text_x + text_width/2 and 
            text_y - text_height/2 <= y <= text_y + text_height/2):
            self.dragging_text = True
            self.drag_start_x = x - text_x
            self.drag_start_y = y - text_y
    
    def _drag(self, event):
        x, y = event.x, event.y
        
        # T-shirt boundaries
        t_shirt_bounds = (60, 100, 320, 450)  # (left, top, right, bottom)
        
        if self.resizing_drawing:
            # Calculate new size based on drag distance
            dx = x - self.drag_start_x
            dy = y - self.drag_start_y
            
            # Use the maximum of dx and dy for proportional resizing
            delta = max(dx, dy)
            
            # Apply new size with minimum and maximum constraints
            new_size = max(50, min(300, self.original_drawing_size + delta))
            
            if new_size != self.drawing_size:
                self.drawing_size = new_size
                self.drawing_size_slider.set(new_size)
                self._update_preview()
        
        elif self.dragging_drawing:
            # Keep drawing within T-shirt boundaries
            new_x = max(t_shirt_bounds[0], min(t_shirt_bounds[2] - self.drawing_size, x - self.drag_start_x))
            new_y = max(t_shirt_bounds[1], min(t_shirt_bounds[3] - self.drawing_size, y - self.drag_start_y))
            self.drawing_position = (new_x, new_y)
            self._update_preview()
        
        elif self.dragging_text:
            # Calculate text boundaries based on current text size
            text_width = len(self.user_text) * (self.text_size / 2)
            
            # Keep text within T-shirt boundaries
            new_x = max(t_shirt_bounds[0] + text_width/2, 
                        min(t_shirt_bounds[2] - text_width/2, x - self.drag_start_x))
            new_y = max(t_shirt_bounds[1] + self.text_size/2, 
                        min(t_shirt_bounds[3] - self.text_size/2, y - self.drag_start_y))
            self.text_position = (new_x, new_y)
            self._update_preview()
    
    def _stop_drag(self, event):
        self.dragging_drawing = False
        self.dragging_text = False
        self.resizing_drawing = False
    
    def _update_drawing_size(self, val):
        self.drawing_size = int(val)
        self._update_preview()
    
    def _update_text_size(self, val):
        self.text_size = int(val)
        self._update_preview()
    
    def _choose_drawing_color(self):
        color = colorchooser.askcolor(initialcolor=self.current_color)[1]
        if color:
            self.current_color = color
            self.color_btn.config(bg=color)
    
    def _choose_tshirt_color(self):
        color = colorchooser.askcolor(initialcolor=self.tshirt_color)[1]
        if color:
            self.tshirt_color = color
            self.tshirt_color_btn.config(bg=color)
            self._update_preview()
    
    def _choose_text_color(self):
        color = colorchooser.askcolor(initialcolor=self.user_text_color)[1]
        if color:
            self.user_text_color = color
            self.text_color_btn.config(bg=color)
            self._update_preview()
    
    def _update_brush_size(self, val):
        self.brush_size = int(val)
    
    def _clear_canvas(self):
        self.canvas.delete("all")
        self.drawing_image = Image.new("RGBA", (500, 500), (255, 255, 255, 0))
        self.drawing_draw = ImageDraw.Draw(self.drawing_image)
        self._update_preview()
    
    def _apply_text(self):
        self.user_text = self.text_entry.get()
        self._update_preview()
    
    def _update_preview(self):
        # Create a base T-shirt template
        tshirt_template = Image.new("RGB", (380, 600), color=self.tshirt_color)
        draw = ImageDraw.Draw(tshirt_template)
        
        # Draw T-shirt outline
        # This is a simple shape, in a real app you might use a proper T-shirt template image
        draw.polygon([(100, 100), (280, 100), (320, 170), (320, 450), (60, 450), (60, 170)], outline="black")
        draw.polygon([(280, 100), (320, 170), (360, 130), (300, 60)], outline="black")  # Right sleeve
        draw.polygon([(100, 100), (60, 170), (20, 130), (80, 60)], outline="black")  # Left sleeve
        
        # Place the user drawing in the user-defined position and size
        if self.drawing_image:
            # Resize drawing to user-specified size
            resized_drawing = self.drawing_image.resize((self.drawing_size, self.drawing_size), Image.LANCZOS)
            tshirt_template.paste(resized_drawing, self.drawing_position, resized_drawing)
        
        # Add text if provided
        if self.user_text:
            try:
                font = ImageFont.truetype("arial.ttf", self.text_size)
            except IOError:
                # Use default font with size approximation if arial.ttf is not available
                default_font = ImageFont.load_default()
                # Scale factor is approximate
                font = default_font.font_variant(size=self.text_size) if hasattr(default_font, 'font_variant') else default_font
            
            draw.text(self.text_position, self.user_text, fill=self.user_text_color, font=font, anchor="mm")
        
        # Convert to PhotoImage and update preview
        self.preview_image = ImageTk.PhotoImage(tshirt_template)
        self.preview_canvas.delete("all")
        self.preview_canvas.create_image(190, 300, image=self.preview_image)
        
        # Add visual indicator for draggable items
        if self.user_text:
            # Draw a small handle or highlight around the text
            text_x, text_y = self.text_position
            text_width = len(self.user_text) * (self.text_size / 2)
            text_height = self.text_size + 10
            
            self.preview_canvas.create_rectangle(
                text_x - text_width/2 - 2, text_y - text_height/2 - 2, 
                text_x + text_width/2 + 2, text_y + text_height/2 + 2,
                outline="blue", width=1, dash=(2, 2), tags="text_handle"
            )
        
        # Add a highlight around the drawing area
        drawing_x, drawing_y = self.drawing_position
        self.preview_canvas.create_rectangle(
            drawing_x - 2, drawing_y - 2, 
            drawing_x + self.drawing_size + 2, drawing_y + self.drawing_size + 2,
            outline="blue", width=1, dash=(2, 2), tags="drawing_handle"
        )
        
        # Add resize handle for the drawing (bottom-right corner)
        handle_size = 5
        self.preview_canvas.create_rectangle(
            drawing_x + self.drawing_size - handle_size, drawing_y + self.drawing_size - handle_size,
            drawing_x + self.drawing_size + handle_size, drawing_y + self.drawing_size + handle_size,
            fill="blue", outline="white", tags="resize_handle"
        )
    
    def _generate_tshirt(self):
        # Show loading message
        self.root.config(cursor="wait")
        loading_label = tk.Label(self.root, text="Generating design...", font=("Arial", 16))
        loading_label.place(relx=0.5, rely=0.5, anchor=tk.CENTER)
        self.root.update()
        
        try:
            # Get the API key from environment variable
            api_key = os.getenv("IMAGE_GEN_API_KEY")
            if not api_key:
                messagebox.showerror("API Key Missing", "Please set the IMAGE_GEN_API_KEY environment variable")
                return
            
            # Prepare the design elements
            # Convert drawing to base64
            buffered = io.BytesIO()
            self.drawing_image.save(buffered, format="PNG")
            drawing_base64 = base64.b64encode(buffered.getvalue()).decode()
            
            # Determine the relative positions for the prompt
            drawing_pos = "centered"
            if self.drawing_position[1] < 200:
                drawing_pos = "upper"
            elif self.drawing_position[1] > 300:
                drawing_pos = "lower"
                
            text_pos = "bottom"
            if self.text_position[1] < 200:
                text_pos = "top"
            elif self.text_position[1] < 300:
                text_pos = "middle"
                
            # Determine size descriptions
            drawing_size_desc = "medium-sized"
            if self.drawing_size < 100:
                drawing_size_desc = "small"
            elif self.drawing_size > 200:
                drawing_size_desc = "large"
                
            text_size_desc = "medium"
            if self.text_size < 15:
                text_size_desc = "small"
            elif self.text_size > 30:
                text_size_desc = "large"
            
            # Create a prompt for the image generation API
            prompt = f"""
            Create a realistic photograph of a {self._color_name(self.tshirt_color)} t-shirt with a custom design.
            The t-shirt has the following elements:
            1. {text_size_desc.capitalize()} text that says: "{self.user_text}" in {self._color_name(self.user_text_color)} color, positioned at the {text_pos} of the shirt.
            2. A {drawing_size_desc} custom graphic design that looks like the drawing I've provided, positioned in the {drawing_pos} part of the shirt.
            Make it look like a professional product photo on a plain background.
            """
            
            # API endpoint (example - replace with the actual API you're using)
            url = "https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image"
            
            # Request headers
            headers = {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": f"Bearer {api_key}"
            }
            
            # Request payload
            payload = {
                "text_prompts": [{"text": prompt}],
                "cfg_scale": 7,
                "height": 1024,
                "width": 1024,
                "samples": 1,
                "steps": 30,
            }
            
            # Send request to image generation API
            response = requests.post(url, headers=headers, json=payload)
            
            if response.status_code == 200:
                # Save the generated image
                result = response.json()
                image_data = base64.b64decode(result["artifacts"][0]["base64"])
                
                # Save the image
                output_dir = "generated_designs"
                os.makedirs(output_dir, exist_ok=True)
                filename = f"{output_dir}/tshirt_design_{len(os.listdir(output_dir))}.png"
                
                with open(filename, "wb") as f:
                    f.write(image_data)
                
                # Show success message
                messagebox.showinfo("Success", f"T-shirt design generated and saved as {filename}")
                
                # Display the generated image
                generated_img = Image.open(io.BytesIO(image_data))
                generated_img = generated_img.resize((380, 380), Image.LANCZOS)
                self.generated_image = ImageTk.PhotoImage(generated_img)
                
                # Create a new window to display the generated image
                top = tk.Toplevel(self.root)
                top.title("Generated T-Shirt Design")
                top.geometry("400x450")
                
                # Display image
                img_label = tk.Label(top, image=self.generated_image)
                img_label.pack(pady=10)
                
                # Add a label with the file path
                path_label = tk.Label(top, text=f"Saved as: {filename}")
                path_label.pack(pady=5)
                
                # Keep a reference to prevent garbage collection
                top.generated_image = self.generated_image
            else:
                messagebox.showerror("Error", f"Failed to generate design: {response.text}")
        
        except Exception as e:
            messagebox.showerror("Error", f"An error occurred: {str(e)}")
        
        finally:
            # Remove loading message and restore cursor
            loading_label.destroy()
            self.root.config(cursor="")
    
    def _color_name(self, hex_color):
        """Convert hex color to a descriptive name"""
        # This is a simplified version - in a real app, you might use a color naming library
        # or a more comprehensive color mapping
        color_map = {
            "#FFFFFF": "white",
            "#000000": "black",
            "#FF0000": "red",
            "#00FF00": "green",
            "#0000FF": "blue",
            "#FFFF00": "yellow",
            "#FF00FF": "pink",
            "#00FFFF": "cyan",
            "#FFA500": "orange",
            "#800080": "purple",
            "#A52A2A": "brown",
            "#808080": "gray"
        }
        
        # Try to find exact match
        if hex_color.upper() in color_map:
            return color_map[hex_color.upper()]
        
        # If no exact match, try to find closest color (very simplified)
        # In a real app, you'd use proper color distance algorithms
        return "colored"  # Default fallback


def main():
    root = tk.Tk()
    app = TShirtDesignApp(root)
    root.mainloop()


if __name__ == "__main__":
    main()  