import re

def youtube_embed(url: str) -> str:
    # Extract ID from https://www.youtube.com/watch?v=VIDEO_ID or youtu.be/VIDEO_ID
#                     https://www.youtube.com/watch?v=RynonMlwPDs&feature=youtu.be
    patterns = [
        r'(?:youtube\.com/watch\?v=|youtu\.be/|youtube\.com/embed/)([^&\n?#]+)',
        r'(?:youtube\.com/shorts/)([^&\n?#]+)'
    ]
    video_id = None
    for pattern in patterns:
        match = re.search(pattern, url)
        if match:
            video_id = match.group(1)
            break

    if not video_id:
        return f'<p>Invalid YouTube URL: {url}</p>'

    return f'''
    <div class="video-container">
        <iframe width="560" height="315"
                src="https://www.youtube.com/embed/{video_id}"
                title="YouTube video"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen>
        </iframe>
    </div>
    '''