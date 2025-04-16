import ReactMarkdown from "react-markdown";
import YouTube from "react-youtube";

const opts = {
  height: '390',
  width: '640',
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
    autoplay: 0,
  },
};

function ChapterContent({chapter,content}) {

  return (
    <div className='p-10'>

      <h2 className='font-medium text-2xl'>{chapter?.['Chapter Name']}</h2>
      {/* <p className='text-gray-500'>{chapter?.Content}</p> */}

      {/* Video */}
      <div className='flex justify-center mt-10 mb-10'>
        <YouTube
        videoId={content?.videoId}
        opts={opts}
        />
      </div>

      <div>
          {content?.content?.sections?.map((item, index) => (
          <div className='p-5 bg-sky-50 mb-3 rounded-lg'>
            <h2 className='font-bold text-lg'>{item.title}</h2>
            <ReactMarkdown>{item?.explanation}</ReactMarkdown>
            {item.code_examples && 
              <div className='p-4 bg-black text-white rounded-md mt-3'>
                <pre>
                  <code className={`language-${item.code_examples.language || 'plaintext'}`}>
                    {item.code_examples.code}
                  </code>
                </pre>
              </div>}
          </div>
      ))}
      </div>



      {/* Content */}


    </div>
  )
}

export default ChapterContent
