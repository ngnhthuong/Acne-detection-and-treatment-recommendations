import logging
from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_chroma import Chroma
from langchain_google_genai import GoogleGenerativeAIEmbeddings, ChatGoogleGenerativeAI
from langchain.chains import create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_core.prompts import ChatPromptTemplate
import markdown

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

GOOGLE_API_KEY = "AIzaSyA-hTQ0ATIHXks1t4iIxIsiQdvXLqfBKEk"

try:
    loader = PyPDFLoader("/Users/nhatthuong/Documents/Acne-detection-and-treatment-recommendations/backend/fastapi_all/ai/rag/documents/RESUME_NGUYEN_NHAT_THUONG.pdf")
    data = loader.load()
except Exception as e:
    logger.error(f"Error loading PDF: {e}")
    raise

try:
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000)
    docs = text_splitter.split_documents(data)
except Exception as e:
    logger.error(f"Error splitting documents: {e}")
    raise

try:
    embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001", google_api_key=GOOGLE_API_KEY)
    vectorstore = Chroma.from_documents(documents=docs, embedding=embeddings)
    retriever = vectorstore.as_retriever(search_type="similarity", search_kwargs={"k": 10})
except Exception as e:
    logger.error(f"Error creating embeddings or vectorstore: {e}")
    raise

try:
    llm = ChatGoogleGenerativeAI(model="gemini-1.5-pro", temperature=0.3, max_tokens=500, google_api_key=GOOGLE_API_KEY)
except Exception as e:
    logger.error(f"Error initializing language model: {e}")
    raise

system_prompt = (
    "Bạn là trợ lý cho các nhiệm vụ trả lời câu hỏi. hãy sử dụng tiếng Việt Nam"
    "Sử dụng các phần sau đây của ngữ cảnh đã thu thập được để trả lời "
    "Câu hỏi. Nếu bạn không biết câu trả lời, hãy nói rằng bạn "
    "không biết."
    "Vui lòng trả lời bằng tiếng Việt và không sử dụng từ ngữ không phù hợp."
    "Khi có ai hỏi bạn là ai, hãy nói rằng bạn là trợ lý của Glowypa chuyên gia về điều trị tư vấn mụn, và bạn sẽ cố gắng giúp họ. "
    "\n\n"
    "{context}"
)

prompt = ChatPromptTemplate.from_messages(
    [
        ("system", system_prompt),
        ("human", "{input}"),
    ]
)

try:
    question_answer_chain = create_stuff_documents_chain(llm, prompt)
    rag_chain = create_retrieval_chain(retriever, question_answer_chain)
except Exception as e:
    logger.error(f"Error creating chains: {e}")
    raise

def remove_newlines(input_string):
    return input_string.replace('\n', '')

def chatgpt_response_to_html(response_text):
    """
    Convert ChatGPT's response into HTML formatted text.

    Args:
        response_text (str): The text response from ChatGPT.

    Returns:
        str: HTML formatted string.
    """
    html_output = markdown.markdown(response_text)
    return html_output

def mainChat(question):
    try:
        response = rag_chain.invoke({"input": question})
        markdown_tag = chatgpt_response_to_html(response["answer"])
        answer = remove_newlines(markdown_tag)
        return answer
    except Exception as e:
        logger.error(f"Error during chat invocation: {e}")
        return "<p>Xin lỗi, đã xảy ra lỗi khi xử lý yêu cầu của bạn.</p>"

