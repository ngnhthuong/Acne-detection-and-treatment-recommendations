from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_chroma import Chroma
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.chains import create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_core.prompts import ChatPromptTemplate

GOOGLE_API_KEY = "AIzaSyAhmEYVL47zs_38duN5uH6Lofs1kk8T0ts"


loader = PyPDFLoader("/Users/nhatthuong/Documents/Acne-detection-and-treatment-recommendations/backend/fastapi_all/rag/documents/RESUME_NGUYEN_NHAT_THUONG.pdf")
data = loader.load()

text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000)
docs = text_splitter.split_documents(data)

embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001",google_api_key=GOOGLE_API_KEY)
vector = embeddings.embed_query("hello, world!")
vectorstore = Chroma.from_documents(documents=docs, embedding=GoogleGenerativeAIEmbeddings(model="models/embedding-001", google_api_key=GOOGLE_API_KEY))
retriever = vectorstore.as_retriever(search_type="similarity", search_kwargs={"k": 10})
llm = ChatGoogleGenerativeAI(model="gemini-1.5-pro",temperature=0.3, max_tokens=500,google_api_key=GOOGLE_API_KEY)

system_prompt = (
"Bạn là trợ lý cho các nhiệm vụ trả lời câu hỏi."
"Sử dụng các phần sau đây của ngữ cảnh đã thu thập được để trả lời "
"Câu hỏi. Nếu bạn không biết câu trả lời, hãy nói rằng bạn "
"không biết."
"Vui lòng trả lời bằng tiếng Việt"
"\n\n"
"{context}"
)


prompt = ChatPromptTemplate.from_messages(
    [
        ("system", system_prompt),
        ("human", "{input}"),
    ]
)

question_answer_chain = create_stuff_documents_chain(llm, prompt)

rag_chain = create_retrieval_chain(retriever, question_answer_chain)


def mainChat(question):
    response = rag_chain.invoke({"input": question})
    return response["answer"]
    