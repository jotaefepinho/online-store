import os
import re

def inline_css_js(html_file):
    with open(html_file, 'r', encoding='utf-8') as file:
        html_content = file.read()

    # Inline CSS
    css_links = re.findall(r'<link rel="stylesheet" href="(.*?)">', html_content)
    for css_file in css_links:
        print(f"Styling file: {css_file}")
        if os.path.exists(css_file):
            with open(css_file, 'r', encoding='utf-8') as css:
                css_content = css.read()
            css_tag = f"<style>{css_content}</style>"
            html_content = html_content.replace(f'<link rel="stylesheet" href="{css_file}">', css_tag)
    
    # Inline JavaScript
    js_links = re.findall(r'<script src="(.*?)"></script>', html_content)
    for js_file in js_links:
        print(f"Scripting File {js_file}")
        if os.path.exists(js_file):
            with open(js_file, 'r', encoding='utf-8') as js:
                js_content = js.read()
            js_tag = f"<script>{js_content}</script>"
            html_content = html_content.replace(f'<script src="{js_file}"></script>', js_tag)

    # Save the modified HTML
    output_file = "output.html"
    with open(output_file, 'w', encoding='utf-8') as file:
        file.write(html_content)
    print(f"Output saved to {output_file}")

# Run the function with your HTML file
inline_css_js("admin.html")