import { Box, Flex, Text, Heading, Img, Badge } from '@chakra-ui/react'
import AuthContext from "@/context/AuthContext";
import { useContext } from 'react'
import Sidebar from "@/components/Sidebar/App";
import useSWR from 'swr';
import axios from 'axios';
import moment from 'moment';
import ReactMarkdown from 'react-markdown'
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';
import { RichTextTheme } from '@/lib/richtext_theme';

const fetcher = url => axios.get(url).then(res => res.data)


export default function Home({speakers, faq, schedule}) {
  const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_STRAPI_URL}/announcements?_sort=published_at:DESC`, fetcher, { refreshInterval: 500 })
  return (
    <Flex>
      <Sidebar active={'announcements'}/>
      <Box mx='12' my='4'>
        <Heading fontFamily='Space Mono' fontSize='48px'>Recent announcements</Heading>
        <Box my='12' maxW='2xl'>
            {data?.slice(0,1).map((item, idx)=>(
              <AnnouncementCard title={item.title} content={item.content} date={item.published_at} isImportant={item.isImportant} key={idx}/>
            ))}
        </Box>
        <Heading fontFamily='Space Mono' fontSize='48px'>Past announcements</Heading>
        <Box my='12'>
            {data?.slice(1,).map((item, idx)=>(
              <AnnouncementCard title={item.title} content={item.content} date={item.published_at} isImportant={item.isImportant} key={idx}/>
            ))}
        </Box>
      </Box>
    </Flex>
  )
}

function AnnouncementCard (props) {
  const { title, content, date, isImportant } = props;
  return (
    <Box
    px='8'
    py='4'
    my='8'
    rounded='xl'
    backgroundClip='content-box, border-box'
    border={`1px solid #76E094`}
    _hover={{
        transform:'translate(-5px, 4px)',
        boxShadow:`-5px 4px 0px 1px #76E094`
    }}
    boxShadow= {`-10px 8px 0px 1px #76E094`}
    pos='relative'
    >
        <Flex align='center' justify='space-between' >
          <Heading fontSize='2xl'>{title}</Heading>
         <Badge 
            display={isImportant? 'block' : 'none'}
            border={`1px solid #C64F4B`}
            bg={`#C64F4B30`}
            color='#C64F4B'
         >Important</Badge>
        </Flex>
        
        <Text>Posted on {moment(date).format('DD/MM/YYYY')}</Text>
        <ReactMarkdown
          components={ChakraUIRenderer(RichTextTheme)}
          escapeHtml={false}
          >{content}</ReactMarkdown>
    </Box>
  )
}